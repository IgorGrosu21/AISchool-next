import type { CacheUpdater, CachedResponse, StorageValue } from "axios-cache-interceptor"
import type { IDetailedHomework, INote, IDetailedLesson, IDetailedMedia, IDetailedSpecificLesson, IHomework, ILessonName, ISpecificLesson, ISpecificLessonName } from "../interfaces"
import { request, send } from "./client"

//lesson
export async function fetchLessonNames(accountType: string, personId: string, schoolSlug?: string) {
  return request<ILessonName[]>({url: `api/lesson-names/${accountType}/${personId}/${schoolSlug ? '?school=' + schoolSlug : ''}`})
}

export async function fetchLesson(schoolSlug: string, klassSlug: string, lessonId: string) {
  return request<IDetailedLesson>({url: `api/lessons/${schoolSlug}/${klassSlug}/${lessonId}`})
}

//specificLesson
export async function fetchSpecificLessonNames(accountType: string, personId: string, dateRange: string, schoolSlug?: string) {
  return request<ISpecificLessonName[]>({url: `api/specific-lessons-names/${accountType}/${personId}/${dateRange}/${schoolSlug ? '?school=' + schoolSlug : ''}`})
}

export async function fetchSpecificLesson(schoolSlug: string, klassSlug: string, lessonId: string, date: string) {
  return request<IDetailedSpecificLesson>({url: `api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`})
}

function extractDataFromSpecificLesson(specificLesson: ISpecificLesson) {
  return {
    schoolSlug: specificLesson.lesson.klass.school.slug,
    klassSlug: specificLesson.lesson.klass.slug,
    lessonId: specificLesson.lesson.id,
    date: specificLesson.date
  }
}

export async function sendSpecificLesson(specificLesson: IDetailedSpecificLesson) {
  const { schoolSlug, klassSlug, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  return send<IDetailedSpecificLesson>({
    url: `api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`,
    method: 'PUT',
    data: specificLesson
  }, 'replace')
}

export async function deleteSpecificLesson(specificLesson: IDetailedSpecificLesson) {
  const { schoolSlug, klassSlug, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  const update: CacheUpdater<CachedResponse, IHomework> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = () => 'delete'

  return send<IDetailedSpecificLesson>({
    url: `api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`,
    method: 'DELETE',
    cache: { update: update }
  })
}

export async function sendSpecificLessonPhoto(specificLesson: IDetailedSpecificLesson, data: FormData) {
  const { schoolSlug, klassSlug, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    const file = response.data as IDetailedMedia
    return {...cache, data: {...cache.data, data: {...cachedData, files: [...cachedData.files, file]}}};
  }
  return send<IDetailedMedia>({
    url: `api/specific-lesson-photos/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`,
    method: 'POST',
    data: data,
    cache: { update: update }
  })
}

export async function deleteSpecificLessonPhoto(specificLesson: IDetailedSpecificLesson, id: string) {
  const { schoolSlug, klassSlug, lessonId, date } = extractDataFromSpecificLesson(specificLesson)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    return {...cache, data: {...cache.data, data: {...cachedData, files: cachedData.files.filter(f => f.id !== id)}}};
  }
  return send<undefined>({
    url: `api/specific-lesson-photos/${schoolSlug}/${klassSlug}/${lessonId}/${date}/?id=${id}`,
    method: 'DELETE',
    cache: { update: update }
  })
}

//homework
export async function fetchHomework(schoolSlug: string, klassSlug: string, lessonId: string, specificLessonId: string, studentId: string) {
  return request<IDetailedHomework>({url: `api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`})
}

function extractDataFromHomework(homework: IDetailedHomework) {
  return {
    schoolSlug: homework.specificLesson.lesson.klass.school.slug,
    klassSlug: homework.specificLesson.lesson.klass.slug,
    lessonId: homework.specificLesson.lesson.id,
    date: homework.specificLesson.date,
    specificLessonId: homework.specificLesson.id,
    studentId: homework.student.id
  }
}

function updateHomework(homework: IDetailedHomework, cache: StorageValue, response?: CachedResponse) {
  if (cache.state !== 'cached') {
    return 'ignore';
  }
  const cachedData = cache.data.data as IDetailedSpecificLesson
  const homeworkData = response?.data as IHomework | undefined
  return {...cache, data: {...cache.data, data: {...cachedData, homeworks: [
    ...cachedData.homeworks.filter(h => h.student !== homework.student.id), homeworkData
  ]}}};
}

export async function sendHomework(homework: IDetailedHomework) {
  const { schoolSlug, klassSlug, lessonId, date, specificLessonId, studentId } = extractDataFromHomework(homework)

  const update: CacheUpdater<CachedResponse, IHomework> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
    return updateHomework(homework, cache, response)
  }
  update[`api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    return {...cache, data: { ...cache.data, data: response.data }};
  }

  return send<IDetailedHomework>({
    url: `api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`,
    method: 'PUT',
    data: homework,
    cache: { update: update }
  })
}

export async function deleteHomework(homework: IDetailedHomework) {
  const { schoolSlug, klassSlug, lessonId, date, specificLessonId, studentId } = extractDataFromHomework(homework)

  const update: CacheUpdater<CachedResponse, IHomework> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue) => updateHomework(homework, cache)
  update[`api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`] = 'delete'

  return send<IDetailedHomework>({
    url: `api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`,
    method: 'DELETE',
    cache: { update: update }
  })
}

export async function sendHomeworkPhoto(homework: IDetailedHomework, data: FormData) {
  const { schoolSlug, klassSlug, lessonId, date, specificLessonId, studentId } = extractDataFromHomework(homework)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    const file = response.data as IDetailedMedia
    return {...cache, data: {...cache.data, data: {...cachedData, homeworks: cachedData.homeworks.map(
      h => h.student === studentId ? {...h, files: [...h.files, file]} : h
    )}}};
  }
  update[`api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedHomework
    const file = response.data as IDetailedMedia
    return {...cache, data: {...cache.data, data: {...cachedData, files: [...cachedData.files, file]}}};
  }

  return send<IDetailedMedia>({
    url: `api/homework-photos/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`,
    method: 'POST',
    data: data,
    cache: { update: update }
  })
}

export async function deleteHomeworkPhoto(homework: IDetailedHomework, id: string) {
  const { schoolSlug, klassSlug, lessonId, date, specificLessonId, studentId } = extractDataFromHomework(homework)

  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/specific-lessons/${schoolSlug}/${klassSlug}/${lessonId}/${date}/`] = (cache: StorageValue) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSpecificLesson
    return {...cache, data: {...cache.data, data: {...cachedData, homeworks: cachedData.homeworks.map(
      h => h.student === studentId ? {...h, files: h.files.filter(f => f.id !== id)} : h
    )}}};
  }
  update[`api/homeworks/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/`] = (cache: StorageValue) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedHomework
    return {...cache, data: {...cache.data, data: {...cachedData, files: cachedData.files.filter(f => f.id !== id)}}};
  }
  return send<undefined>({
    url: `api/homework-photos/${schoolSlug}/${klassSlug}/${lessonId}/${specificLessonId}/${studentId}/?id=${id}`,
    method: 'DELETE',
    cache: { update: update }
  })
}

//note

export async function fetchStudentNotes(studentId: string, period: string) {
  return request<INote[]>({url: `api/student-notes/${studentId}/${period}/`})
}

export async function fetchTeacherNotes(teacherId: string, schoolSlug: string, klassSlug: string, subjectSlug: string, period: string) {
  return request<INote[]>({url: `api/teacher-notes/${teacherId}/${schoolSlug}/${klassSlug}/${subjectSlug}/${period}/`})
}

export async function sendNote(note: INote) {
  const specificLesson = note.specificLesson
  const lesson = specificLesson.lesson
  const schoolSlug = lesson.klass.school.slug
  const klassSlug = lesson.klass.slug
  const studentId = note.student.id
  
  const update: CacheUpdater<CachedResponse, IHomework> = { }
  return send<INote>({
    url: `api/notes/${schoolSlug}/${klassSlug}/${lesson.id}/${studentId}/`,
    method: 'POST',
    data: note,
    cache: { update: update }
  })
}