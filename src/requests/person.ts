import type { IDetailedParent, IDetailedStudent, IDetailedTeacher, IPersonHome } from "../interfaces"
import { request, send } from "./client"

export async function fetchParent(id: string) {
  return request<IDetailedParent>({url: `api/parents/${id}/`})
}

export async function sendParent(parent: IDetailedParent) {
  return send<IDetailedParent>({url: `api/parents/${parent.id}/`, method: 'PUT', data: parent}, 'replace')
}

export async function fetchStudent(id: string) {
  return request<IDetailedStudent>({url: `api/students/${id}/`})
}

export async function sendStudent(student: IDetailedStudent) {
  return send<IDetailedStudent>({url: `api/students/${student.id}/`, method: 'PUT', data: student}, 'replace')
}

export async function fetchTeacher(id: string) {
  return request<IDetailedTeacher>({url: `api/teachers/${id}/`})
}

export async function sendTeacher(teacher: IDetailedTeacher) {
  return send<IDetailedTeacher>({url: `api/teachers/${teacher.id}/`, method: 'PUT', data: teacher}, 'replace')
}

export async function fetchPersonHome() {
  return request<IPersonHome>({url: `api/home/`})
}