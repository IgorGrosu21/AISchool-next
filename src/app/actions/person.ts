'use server'

import { sendParent, sendStudent, sendTeacher } from "@/requests"
import { IDetailedParent, IDetailedStudent, IDetailedTeacher } from "@/interfaces"
import { EditActionFunction } from "./template"

export const editParent: EditActionFunction<IDetailedParent> = async (instance) => {
  instance.user.socials = instance.user.socials.map(s => ({...s, user: instance.user.id}))
  return sendParent(instance)
}

export const editStudent: EditActionFunction<IDetailedStudent> = async (instance) => {
  instance.user.socials = instance.user.socials.map(s => ({...s, user: instance.user.id}))
  return sendStudent(instance)
}

export const editTeacher: EditActionFunction<IDetailedTeacher> = async (instance) => {
  instance.user.socials = instance.user.socials.map(s => ({...s, user: instance.user.id}))
  return sendTeacher(instance)
}