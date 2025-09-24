'use server'

import { cookies } from 'next/headers'
import { ITokens } from '@/interfaces';

export async function getToken(type = 'access') {
  const cookieStore = await cookies()
  return cookieStore.get(`${type}_token`)?.value
}

export async function createToken(type: string, token: string) {
  return {
    name: `${type}_token`,
    value: token,
    maxAge: type === 'access' ? 7_200 : 15_552_000, //2 hours or 180 days
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'strict' as const,
    priority: 'high' as const
  }
}

export async function setToken(type: string, token: string) {
  const cookieStore = await cookies()
  cookieStore.set(await createToken(type, token))
}

export async function setTokens(tokens: ITokens) {
  await setToken('access', tokens.access)
  await setToken('refresh', tokens.refresh)
}

export async function deleteTokens() {
  const cookieStore = await cookies()
  cookieStore.delete(`access_token`)
  cookieStore.delete(`refresh_token`)
}

export async function isLoggedIn() {
  const refresh = await getToken('refresh')
  return refresh !== undefined
}