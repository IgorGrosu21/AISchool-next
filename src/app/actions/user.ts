'use server'

import { deleteAvatar, errorHandler, sendAvatar } from "@/requests"

export async function editAvatar(formData: FormData) {
  const [dataRaw, status] = await sendAvatar(formData)
  const data = await errorHandler(dataRaw, status)
  return data ?? formData
}

export async function removeAvatar() {
  const [dataRaw, status] = await deleteAvatar()
  await errorHandler(dataRaw, status)
}