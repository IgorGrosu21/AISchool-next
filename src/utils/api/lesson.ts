import type { CacheUpdater, CachedResponse, StorageValue } from "axios-cache-interceptor"
import type { IDetailedMedia, IDetailedSpecificLesson, IHomework, ISchoolWithTimetable, ISpecificLessonName } from "../interfaces"
import { request, requestWithRefresh } from "./client"

//lesson
export async function fetchSchoolWithTimetable(schoolId: string) {
  return request<ISchoolWithTimetable>({url: `api/schools/${schoolId}/timetable/`})
}

export async function sendSchoolWithTimetable(school: ISchoolWithTimetable) {
  return requestWithRefresh<ISchoolWithTimetable>({url: `api/schools/${school.id}/timetable/`, method: 'PUT', data: school}, 'replace')
}

//specificLesson
export async function fetchSpecificLessonNames(schoolId: string, klassId: string, dateRange: string) {
  return request<ISpecificLessonName[]>({url: `api/specific-lessons-preview/${schoolId}/${klassId}/${dateRange}/`})
}

export async function fetchSpecificLesson(schoolId: string, klassId: string, lessonId: string, date: string) {
  return request<IDetailedSpecificLesson>({url: `api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`})
}

function extractDataFromSpecificLesson(specificLesson: IDetailedSpecificLesson) {
  return {
    schoolId: specificLesson.lesson.klass.school.id,
    klassId: specificLesson.lesson.klass.id,
    lessonId: specificLesson.lesson.id,
    date: specificLesson.date
  }
}

export async function sendSpecificLesson(specificLesson: IDetailedSpecificLesson) {
  const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  return requestWithRefresh<IDetailedSpecificLesson>({
    url: `api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`,
    method: 'PUT',
    data: specificLesson
  }, 'replace')
}

export async function sendSpecificLessonPhoto(specificLesson: IDetailedSpecificLesson, data: FormData) {
  const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    const file = response.data as IDetailedMedia
    return {...cache, data: {...cache.data, data: {...cachedData, files: [...cachedData.files, file]}}};
  }
  return requestWithRefresh<IDetailedMedia>({
    url: `api/specific-lesson-photos/${schoolId}/${klassId}/${lessonId}/${date}/`,
    method: 'PUT',
    data: data,
    cache: { update: update }
  })
}

export async function deleteSpecificLessonPhoto(specificLesson: IDetailedSpecificLesson, id: string) {
  const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    return {...cache, data: {...cache.data, data: {...cachedData, files: cachedData.files.filter(f => f.id !== id)}}};
  }
  return requestWithRefresh<undefined>({
    url: `api/specific-lesson-photos/${schoolId}/${klassId}/${lessonId}/${date}/${id}/`,
    method: 'DELETE',
    cache: { update: update }
  })
}

//homework
function updateHomework(homework: IHomework, cache: StorageValue, response?: CachedResponse) {
  if (cache.state !== 'cached') {
    return 'ignore';
  }
  const cachedData = cache.data.data as IDetailedSpecificLesson
  const homeworkData = response?.data as IHomework | undefined
  if (cachedData.canEdit) {
    return {...cache, data: {...cache.data, data: {...cachedData, homeworks: [...cachedData.homeworks.filter(
      h => h.student !== homework.student
    ), homeworkData]}}};
  } else {
    return {...cache, data: {...cache.data, data: {...cachedData, homework: homeworkData}}};
  }
}

export async function sendHomework(specificLesson: IDetailedSpecificLesson) {
  if (!specificLesson.canEdit && specificLesson.homework) {
    const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)
    const homework = specificLesson.homework

    const update: CacheUpdater<CachedResponse, IHomework> = { }
    update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
      return updateHomework(homework, cache, response)
    }
    return requestWithRefresh<IHomework>({
      url: `api/homework/${schoolId}/${klassId}/${lessonId}/${date}/`,
      method: 'PUT',
      data: homework,
      cache: { update: update }
    })
  }
  return undefined
}

export async function deleteHomework(specificLesson: IDetailedSpecificLesson) {
  if (!specificLesson.canEdit && specificLesson.homework) {
    const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)
    const homework = specificLesson.homework

    const update: CacheUpdater<CachedResponse, IHomework> = { }
    update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue) => updateHomework(homework, cache)
    return requestWithRefresh<IHomework>({
      url: `api/homework/${schoolId}/${klassId}/${lessonId}/${date}/`,
      method: 'DELETE',
      data: homework,
      cache: { update: update }
    })
  }
  return undefined
}

export async function sendHomeworkPhoto(specificLesson: IDetailedSpecificLesson, data: FormData) {
  if (!specificLesson.canEdit && specificLesson.homework) {
    const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)
    const homework = specificLesson.homework

    const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
    update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
      if (cache.state !== 'cached') {
        return 'ignore';
      }
      const cachedData = cache.data.data as IDetailedSpecificLesson
      const file = response.data as IDetailedMedia
      if (cachedData.canEdit) {
        return {...cache, data: {...cache.data, data: {...cachedData, homeworks: cachedData.homeworks.map(
          h => h.student === homework.student ? {...h, files: [...h.files, file]} : h
        )}}};
      } else {
        return {...cache, data: {...cache.data, data: {...cachedData, homework: {
          ...cachedData.homework,
          files: [...(cachedData.homework?.files ?? []), file]
        }}}};
      }
    }
    return requestWithRefresh<IDetailedMedia>({
      url: `api/homework-photos/${schoolId}/${klassId}/${lessonId}/${date}/`,
      method: 'PUT',
      data: data,
      cache: { update: update }
    })
  }
}

export async function deleteHomeworkPhoto(specificLesson: IDetailedSpecificLesson, studentId: string, id: string) {
  if (id) {
    const { schoolId, klassId, lessonId, date } = extractDataFromSpecificLesson(specificLesson)
    
    const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
    update[`api/specific-lesson/${schoolId}/${klassId}/${lessonId}/${date}/`] = (cache: StorageValue) => {
      if (cache.state !== 'cached') {
        return 'ignore';
      }
      const cachedData = cache.data.data as IDetailedSpecificLesson
      if (cachedData.canEdit) {
        return {...cache, data: {...cache.data, data: {...cachedData, homeworks: cachedData.homeworks.map(
          h => h.student === studentId ? {...h, files: h.files.filter(f => f.id !== id)} : h
        )}}};
      } else {
        return {...cache, data: {...cache.data, data: {...cachedData, homework: {
          ...cachedData.homework,
          files: cachedData.homework?.files.filter(f => f.id !== id) ?? []
        }}}};
      }
    }
    return requestWithRefresh<undefined>({
      url: `api/homework-photos/${schoolId}/${klassId}/${lessonId}/${date}/${id}/`,
      method: 'DELETE',
      cache: { update: update }
    })
  }
}