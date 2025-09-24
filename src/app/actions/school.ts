'use server'

import { deleteSchoolPhoto, deleteSchoolPreview, errorHandler, sendKlass, sendSchool, sendSchoolPhoto, sendSchoolPreview, sendSchoolWithKlasses, sendSchoolWithTimetable } from "@/requests"
import { IDetailedKlass, IDetailedSchool, ISchoolWithKlasses, ISchoolWithTimetable } from "@/interfaces"
import { EditActionFunction } from "./template"

export const editKlass: EditActionFunction<IDetailedKlass> = async (instance) => {
  instance.school.staff = []
  instance.school.timetable = []
  return sendKlass(instance)
}

export const editSchool: EditActionFunction<IDetailedSchool> = async (instance) => {
  return sendSchool(instance)
}

export async function editSchoolPreview(instance: IDetailedSchool, formData: FormData) {
  const [dataRaw, status] = await sendSchoolPreview(instance.slug, formData)
  const data = await errorHandler(dataRaw, status)
  return data
}

export async function removeSchoolPreview(instance: IDetailedSchool) {
  const [dataRaw, status] = await deleteSchoolPreview(instance.slug)
  await errorHandler(dataRaw, status)
}

export async function editSchoolPhoto(instance: IDetailedSchool, formData: FormData) {
  const [dataRaw, status] = await sendSchoolPhoto(instance.slug, formData)
  const data = await errorHandler(dataRaw, status)
  return data
}

export async function removeSchoolPhoto(instance: IDetailedSchool, id: string) {
  const [dataRaw, status] = await deleteSchoolPhoto(instance.slug, id)
  await errorHandler(dataRaw, status)
}

export const editSchoolWithKlasses: EditActionFunction<ISchoolWithKlasses> = async (instance) => {
  instance.klasses = instance.klasses.map(k => ({...k, school: instance.id}))
  return sendSchoolWithKlasses(instance)
}

export const editSchoolWithTimetable: EditActionFunction<ISchoolWithTimetable> = async (instance) => {
  instance.staff = []
  instance.timetable = instance.timetable.filter(lt => lt.starting != '').map(lt => ({
    ...lt,
    school: instance.id,
    lessons: lt.lessons.map(l => ({...l, lessonTime: lt.id}))
  }))
  return sendSchoolWithTimetable(instance)
}