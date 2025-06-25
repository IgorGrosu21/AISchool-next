import type { IDetailedKlass, IDetailedMedia, IDetailedSchool, ISchoolWithKlasses, IMedia, ISchool, ISchoolName, IKlassWithDiary } from "../interfaces"
import { request, requestWithRefresh } from "./client"

//school
export async function fetchSchoolNames() {
  return request<ISchoolName[]>({url: 'api/school-names/'})
}

export async function fetchSchools() {
  return request<ISchool[]>({url: 'api/schools/'})
}

export async function fetchSchool(id: string) {
  return request<IDetailedSchool>({url: `api/schools/${id}/`})
}

export async function sendSchool(school: IDetailedSchool) {
  return requestWithRefresh<IDetailedSchool>({url: `api/schools/${school.id}/`, method: 'PUT', data: school}, 'replace')
}

//schoolPhoto
export async function sendSchoolPreview(id: string, data: FormData) {
  return requestWithRefresh<IMedia>({url: `api/schools/${id}/`, method: 'PATCH', data: data})
}

export async function deleteSchoolPreview(id: string) {
  return requestWithRefresh<undefined>({url: `api/schools/${id}/`, method: 'DELETE'})
}

export async function sendSchoolPhoto(schoolId: string, id: string | null, data: FormData) {
  return requestWithRefresh<IDetailedMedia>({url: `api/school-photos/${schoolId}/${id ? id + '/' : ''}`, method: id ? 'PATCH' : 'PUT', data: data})
}

export async function deleteSchoolPhoto(schoolId: string, id: string | null) {
  return requestWithRefresh<undefined>({url: `api/school-photos/${schoolId}/${id}/`, method: 'DELETE'})
}

//klass
export async function fetchSchoolWithKlasses(schoolId: string) {
  return request<ISchoolWithKlasses>({url: `api/schools/${schoolId}/klasses/`})
}

export async function sendSchoolWithKlasses(school: ISchoolWithKlasses) {
  return requestWithRefresh<ISchoolWithKlasses>({url: `api/schools/${school.id}/klasses/`, method: 'PUT', data: school}, 'replace')
}

export async function fetchKlass(schoolId: string, id: string) {
  return request<IDetailedKlass>({url: `api/schools/${schoolId}/klasses/${id}/`})
}

export async function sendKlass(klass: IDetailedKlass) {
  return requestWithRefresh<IDetailedKlass>({url: `api/schools/${klass.school.id}/klasses/${klass.id}/`, method: 'PUT', data: klass}, 'replace')
}

export async function fetchKlassDiary(schoolId: string, id: string) {
  return request<IKlassWithDiary>({url: `api/schools/${schoolId}/klasses/${id}/`})
}