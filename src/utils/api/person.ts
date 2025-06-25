import type { IDetailedStudent, IDetailedTeacher } from "../interfaces"
import { request, requestWithRefresh } from "./client"

export async function fetchStudent(id: string) {
  return request<IDetailedStudent>({url: `api/students/${id}/`})
}

export async function sendStudent(student: IDetailedStudent) {
  return requestWithRefresh<IDetailedStudent>({url: `api/students/${student.id}/`, method: 'PUT', data: student}, 'replace')
}

export async function fetchTeacher(id: string) {
  return request<IDetailedTeacher>({url: `api/teachers/${id}/`})
}

export async function sendTeacher(teacher: IDetailedTeacher) {
  return requestWithRefresh<IDetailedTeacher>({url: `api/teachers/${teacher.id}/`, method: 'PUT', data: teacher}, 'replace')
}