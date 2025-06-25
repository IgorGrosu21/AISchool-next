'use server'

import { sendKlass, sendSchool, sendSchoolWithKlasses, sendSchoolWithTimetable } from "@/utils/api"
import { IDetailedKlass, IDetailedSchool, ISchoolWithKlasses, ISchoolWithTimetable } from "@/utils/interfaces"
import { redirect } from "next/navigation"

export async function editKlass(instance: IDetailedKlass) {
  instance.school.staff = []
  instance.school.timetable = []
  const data = await sendKlass(instance)
  if (data) {
    redirect(`/core/schools/${data.school.id}/klasses/${data.id}`)
  }
  return data ?? instance
}

export async function editSchool(instance: IDetailedSchool) {
  const data = await sendSchool(instance)
  if (data) {
    redirect(`/core/schools/${data.id}`)
  }
  return data ?? instance
}

export async function editSchoolWithKlasses(instance: ISchoolWithKlasses) {
  instance.klasses = instance.klasses.map(k => ({...k, school: instance.id}))
  const data = await sendSchoolWithKlasses(instance)
  if (data) {
    redirect(`/core/schools/${data.id}/klasses`)
  }
  return data ?? instance
}

export async function editSchoolWithTimetable(instance: ISchoolWithTimetable) {
  instance.klasses = []
  instance.staff = []
  instance.timetable = instance.timetable.filter(lt => lt.starting != '').map(lt => ({
    ...lt,
    school: instance.id,
    lessons: lt.lessons.map(l => ({...l, lessonTime: lt.id}))
  }))
  const data = await sendSchoolWithTimetable(instance)
  if (data) {
    redirect(`/core/schools/${data.id}/timetable`)
  }
  return data ?? instance
}