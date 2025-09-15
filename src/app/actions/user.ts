'use server'

import { deleteAvatar, sendAvatar } from "@/utils/api"

export async function editAvatar(formData: FormData) {
  return sendAvatar(formData)
}

export async function removeAvatar() {
  return deleteAvatar()
}