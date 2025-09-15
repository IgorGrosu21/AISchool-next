'use server'

import { deleteSchoolPhoto, deleteSchoolPreview, sendKlass, sendSchool, sendSchoolPhoto, sendSchoolPreview, sendSchoolWithKlasses, sendSchoolWithTimetable } from "@/utils/api"
import { IDetailedKlass, IDetailedSchool, ISchoolWithKlasses, ISchoolWithTimetable } from "@/utils/interfaces"
import { redirect } from "next/navigation"

export async function editKlass(instance: IDetailedKlass) {
  instance.school.staff = []
  instance.school.timetable = []
  const data = await sendKlass(instance)
  if (data) {
    redirect(`/core/schools/${data.school.slug}/klasses/${data.slug}`)
  }
  return data ?? instance
}

export async function editSchool(instance: IDetailedSchool) {
  const data = await sendSchool(instance)
  if (data) {
    redirect(`/core/schools/${data.slug}`)
  }
  return data ?? instance
}

export async function editSchoolPreview(instance: IDetailedSchool, formData: FormData) {
  return sendSchoolPreview(instance.slug, formData)
}

export async function removeSchoolPreview(instance: IDetailedSchool) {
  return deleteSchoolPreview(instance.slug)
}

export async function editSchoolPhoto(instance: IDetailedSchool, formData: FormData) {
  return sendSchoolPhoto(instance.slug, formData)
}

export async function removeSchoolPhoto(instance: IDetailedSchool, id: string) {
  return deleteSchoolPhoto(instance.slug, id)
}

export async function editSchoolWithKlasses(instance: ISchoolWithKlasses) {
  instance.klasses = instance.klasses.map(k => ({...k, school: instance.id}))
  const data = await sendSchoolWithKlasses(instance)
  if (data) {
    redirect(`/core/schools/${data.slug}/klasses`)
  }
  return data ?? instance
}

export async function editSchoolWithTimetable(instance: ISchoolWithTimetable) {
  instance.staff = []
  instance.timetable = instance.timetable.filter(lt => lt.starting != '').map(lt => ({
    ...lt,
    school: instance.id,
    lessons: lt.lessons.map(l => ({...l, lessonTime: lt.id}))
  }))
  const data = await sendSchoolWithTimetable(instance)
  if (data) {
    redirect(`/core/schools/${data.slug}/timetable`)
  }
  return data ?? instance
}