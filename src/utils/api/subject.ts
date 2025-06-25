import type { CacheUpdater, CachedResponse, StorageValue } from "axios-cache-interceptor"
import type { IDetailedModule, IDetailedStudent, IDetailedSubject, IDetailedTopic, IDetailedUser, IProgress, ISubject, ISubjectName, ITheory } from "../interfaces"
import { getCachedData, request, requestWithRefresh } from "./client"

export async function fetchSubjectsNames() {
  return request<ISubjectName[]>({url: 'api/subject-names/'})
}

export async function fetchSubjects() {
  return request<ISubject[]>({url: 'api/subjects/'})
}

export async function fetchSubject(slug: string) {
  return request<IDetailedSubject>({url: `api/subjects/${slug}/`})
}

export async function fetchModule(subjectSlug: string, slug: string) {
  return request<IDetailedModule>({url: `api/subjects/${subjectSlug}/${slug}/`})
}

export async function fetchTopic(subjectSlug: string, moduleSlug: string, slug: string) {
  return request<IDetailedTopic>({url: `api/subjects/${subjectSlug}/${moduleSlug}/${slug}/`})
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

export async function sendTheory(topic: IDetailedTopic, theory: ITheory) {
  const subjectSlug = topic.module.subject.slug
  const moduleSlug = topic.module.slug
  const topicSlug = topic.slug
  const slug = theory.slug
  
  const update: CacheUpdater<CachedResponse, IProgress> = { }
  update[`get_api/subjects/${subjectSlug}/`] = (cache, response) => updateProgress<IDetailedSubject>(cache, response, 'subject')
  update[`get_api/subjects/${subjectSlug}/${moduleSlug}/`] = (cache, response) => updateProgress<IDetailedModule>(cache, response, 'module')
  update[`get_api/subjects/${subjectSlug}/${moduleSlug}/${topicSlug}/`] = (cache, response) => {
    const updated = updateProgress<IDetailedTopic>(cache, response, 'topic')
    return updated === 'ignore' ? 'ignore' : {...updated, data: {...updated.data, data: {
      ...updated.data.data,
      completedTheories: updated.data.data.completedTheories.filter(t => t !== slug).concat([slug])
    }}};
  }
  const userData = await getCachedData('get_api/user/')
  const user = userData.data?.data as IDetailedUser
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
      balance[theory.currency] += theory.cost
      return {...cache, data: {...cache.data, data: {...cachedData, balance}}};
    }
  }
  return requestWithRefresh<IProgress>({
    url: `api/subjects/${subjectSlug}/${moduleSlug}/${topicSlug}/theories/${slug}/`,
    method: 'PUT',
    cache: { update: update }
  })
}