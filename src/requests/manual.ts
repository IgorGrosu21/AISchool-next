import type { CacheUpdater, CachedResponse, StorageValue } from "axios-cache-interceptor"
import type { IDetailedModule, IDetailedStudent, IDetailedManual, IDetailedTopic, IDetailedUser, IProgress, IManual, ITask } from "../interfaces"
import { getCachedData, request, send } from "./client"

export async function fetchManuals() {
  return request<IManual[]>({url: 'api/manuals/'})
}

export async function fetchManual(slug: string) {
  return request<IDetailedManual>({url: `api/manuals/${slug}/`})
}

export async function fetchModule(manualSlug: string, slug: string) {
  return request<IDetailedModule>({url: `api/modules/${manualSlug}/${slug}/`})
}

export async function fetchTopic(manualSlug: string, moduleSlug: string, slug: string) {
  return request<IDetailedTopic>({url: `api/topics/${manualSlug}/${moduleSlug}/${slug}/`})
}

function updateProgress<T extends {progress?: number}>(cache: StorageValue, response: CachedResponse, key: string) {
  if (cache.state !== 'cached') {
    return 'ignore';
  }
  const cachedData = cache.data.data as T
  const progressData = response.data as IProgress
  if (cachedData.progress === undefined || progressData[key] === undefined) {
    return 'ignore';
  }
  return {...cache, data: {...cache.data, data: {...cachedData, progress: progressData[key]}}};
} 

export async function sendTask(topic: IDetailedTopic, task: ITask) {
  const manualSlug = topic.module.manual.slug
  const moduleSlug = topic.module.slug
  const topicSlug = topic.slug
  const slug = task.slug
  const userData = await getCachedData('get_api/user-routes/')
  const user = userData.data?.data as IDetailedUser | undefined

  if (user && user.profileLink?.split('/')[0] === 'students') {
    const update: CacheUpdater<CachedResponse, IProgress> = { }
    update[`get_api/manuals/${manualSlug}/`] = (cache, response) => updateProgress<IDetailedManual>(cache, response, 'subject')
    update[`get_api/manuals/${manualSlug}/${moduleSlug}/`] = (cache, response) => updateProgress<IDetailedModule>(cache, response, 'module')
    update[`get_api/manuals/${manualSlug}/${moduleSlug}/${topicSlug}/`] = (cache, response) => {
      const updated = updateProgress<IDetailedTopic>(cache, response, 'topic')
      return updated === 'ignore' ? 'ignore' : {...updated, data: {...updated.data, data: {
        ...updated.data.data,
        completedTasks: updated.data.data.completedTasks.filter(t => t !== slug).concat([slug])
      }}};
    }
    if (user.profileLink?.includes('/')) {
      const studentId = user.profileLink.split('/')[1]
      update[`get_api/students/${studentId}/`] = (cache, response: CachedResponse) => {
        if (cache.state !== 'cached') {
          return 'ignore';
        }
        const progressData = response.data as IProgress
        if (progressData.topic === undefined) {
          return 'ignore';
        }
        const cachedData = cache.data.data as IDetailedStudent
        const balance = cachedData.balance
        balance[task.currency] += task.cost
        return {...cache, data: {...cache.data, data: {...cachedData, balance}}};
      }
    }
    return send<IProgress>({
      url: `api/tasks/${manualSlug}/${moduleSlug}/${topicSlug}/${slug}/`,
      method: 'PUT',
      cache: { update: update }
    })
  }
}