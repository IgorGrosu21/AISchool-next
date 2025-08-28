import { getToken } from '@/app/actions/token';
import axios, { AxiosError } from 'axios';
import { setupCache } from 'axios-cache-interceptor'
import type { CacheRequestConfig, CacheUpdater, CachedResponse } from 'axios-cache-interceptor'
import { IMedia } from '../interfaces';

type updateCacheBehavior = 'replace' | 'ignore'

const api = setupCache(axios.create({
  baseURL: process.env.NEXT_PUBLIC_DJANGO_HOST_PROD,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}));

export async function request<T>(config: CacheRequestConfig, updateCacheType?: updateCacheBehavior, access?: string) {
  access = access ?? await getToken()
  config.method = config.method ?? 'GET'
  if (updateCacheType) {
    const update: CacheUpdater<CachedResponse, T> = { }
    update[`get_${config.url}`] = (cache, response) => { 
      switch (updateCacheType) {
        case 'replace': {
          if (cache.state !== 'cached') {
            return 'ignore';
          }
          return {...cache, data: { ...cache.data, data: response.data }};
        }
        default: return 'ignore'
      }
    }
    config = {...config, cache: { update: update }}
  }
  
  const response = await api.request<T>({
    ...config,
    id: `${config.method?.toLowerCase()}_${config.url}`,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${access}`,
      'Content-Type': config.data instanceof FormData ? 'multipart/form-data' : 'application/json',
    }
  })
  return response.data;
}

async function refreshToken() {
  try {
    const refresh = await getToken('refresh')
    const response = await api.post<{access: string}>('auth/refresh/', { refresh: refresh })
    return response.data;
  } catch {
    return { access: undefined }
  }
}

export async function send<T>(config: CacheRequestConfig, updateCacheType?: updateCacheBehavior) {
  try {
    return await request<T>(config, updateCacheType)
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.status == 401) {
      const { access } = await refreshToken()
      if (access) {
        try {
          return await request<T>(config, updateCacheType, access)
        } catch {
          return undefined
        }
      }
    }
  }
  return undefined
}

export async function sendFile(config: CacheRequestConfig, updateCacheType?: updateCacheBehavior) {
  const response = await send<{file: IMedia}>(config, updateCacheType)
  if (response) {
    return response.file
  }
}

export async function getCachedData(key: string) {
  return api.storage.get(key)
}

export async function deleteAllCache() {
  if (api.storage.clear !== undefined) {
    await api.storage.clear()
  }
}