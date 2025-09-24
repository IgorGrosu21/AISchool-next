import { CachedResponse, CacheUpdater, StorageValue } from "axios-cache-interceptor"
import type { IDetailedKlass, IDetailedMedia, IDetailedSchool, ISchoolWithKlasses, ISchool, ISchoolName, ISchoolWithTimetable, IKlass, ISchoolNameWithTimetable } from "../interfaces"
import { request, send, sendFile } from "./client"

//school
export async function fetchSchoolNames() {
  return request<ISchoolName[]>({url: 'api/school-names/'})
}

export async function fetchSchools() {
  return request<ISchool[]>({url: 'api/schools/'})
}

export async function fetchSchool(slug: string) {
  return request<IDetailedSchool>({url: `api/schools/${slug}/`})
}

export async function sendSchool(school: IDetailedSchool) {
  return send<IDetailedSchool>({url: `api/schools/${school.slug}/`, method: 'PUT', data: school}, 'replace')
}

export async function fetchSchoolWithKlasses(schoolSlug: string) {
  return request<ISchoolWithKlasses>({url: `api/schools/${schoolSlug}/klasses/`})
}

export async function sendSchoolWithKlasses(school: ISchoolWithKlasses) {
  return send<ISchoolWithKlasses>({url: `api/schools/${school.slug}/klasses/`, method: 'PUT', data: school}, 'replace')
}

export async function fetchSchoolWithTimetable(schoolSlug: string) {
  return request<ISchoolWithTimetable>({url: `api/schools/${schoolSlug}/timetable/`})
}

export async function sendSchoolWithTimetable(school: ISchoolWithTimetable) {
  return send<ISchoolWithTimetable>({url: `api/schools/${school.slug}/timetable/`, method: 'PUT', data: school}, 'replace')
}

//schoolPhoto
export async function sendSchoolPreview(slug: string, data: FormData) {
  return sendFile({url: `api/schools/${slug}/`, method: 'PATCH', data: data})
}

export async function deleteSchoolPreview(slug: string) {
  return send<undefined>({url: `api/schools/${slug}/`, method: 'DELETE'})
}

export async function sendSchoolPhoto(schoolSlug: string, data: FormData) {
  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/schools/${schoolSlug}/`] = (cache: StorageValue, response: CachedResponse) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSchool
    return {...cache, data: {...cache.data, data: {...cachedData, preview: response.data}}};
  }
  return send<IDetailedMedia>({url: `api/school-photos/${schoolSlug}/`, method: 'POST', data: data, cache: { update: update }})
}

export async function deleteSchoolPhoto(schoolSlug: string, id: string) {
  const update: CacheUpdater<CachedResponse, IDetailedMedia> = { }
  update[`get_api/schools/${schoolSlug}/`] = (cache: StorageValue) => {
    if (cache.state !== 'cached') {
      return 'ignore';
    }
    const cachedData = cache.data.data as IDetailedSchool
    return {...cache, data: {...cache.data, data: {...cachedData, preview: undefined}}};
  }
  return send<undefined>({url: `api/school-photos/${schoolSlug}/?id=${id}`, method: 'DELETE', cache: { update: update }})
}

export async function fetchSchoolLessonTimeNames(schoolSlug: string) {
  return request<ISchoolNameWithTimetable>({url: `api/schools/${schoolSlug}/lesson-times/`})
}

//klass
export async function fetchKlass(schoolSlug: string, slug: string) {
  return request<IDetailedKlass>({url: `api/klasses/${schoolSlug}/${slug}/`})
}

export async function sendKlass(klass: IDetailedKlass) {
  return send<IDetailedKlass>({url: `api/klasses/${klass.school.slug}/${klass.slug}/`, method: 'PUT', data: klass}, 'replace')
}

export async function fetchTeacherKlasses(schoolSlug: string, teacherId: string) {
  return request<IKlass[]>({url: `api/teacher_klasses/${schoolSlug}/${teacherId}/`})
}