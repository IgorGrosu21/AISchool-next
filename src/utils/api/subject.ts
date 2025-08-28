import type { ISubjectName } from "../interfaces"
import { request } from "./client"

export async function fetchSubjectsNames() {
  return request<ISubjectName[]>({url: 'api/subject-names/'})
}

export async function fetchTeachedSubjects(teacherId: string, schoolSlug: string, klassSlug: string) {
  return request<ISubjectName[]>({url: `api/teached-subjects/${teacherId}/${schoolSlug}/${klassSlug}/`})
}

export async function fetchStudiedSubjects(studentId: string) {
  return request<ISubjectName[]>({url: `api/studied-subjects/${studentId}/`})
}