'use server'

import { sendStudent, sendTeacher } from "@/utils/api"
import { IDetailedStudent, IDetailedTeacher } from "@/utils/interfaces"
import { redirect } from "next/navigation"

export async function editStudent(instance: IDetailedStudent) {
  instance.user.socials = instance.user.socials.map(s => ({...s, user: instance.user.id}))
  const data = await sendStudent(instance)
  if (data) {
    redirect(`/core/students/${data.id}`)
  }
  return data ?? instance
}

export async function editTeacher(instance: IDetailedTeacher) {
  instance.user.socials = instance.user.socials.map(s => ({...s, user: instance.user.id}))
  const data = await sendTeacher(instance)
  if (data) {
    redirect(`/core/teachers/${data.id}`)
  }
  return data ?? instance
}