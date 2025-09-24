import type { IDetailedUser, IUserRoutes } from "../interfaces"
import { request, send, sendFile } from "./client"

export function fetchUserRoutes() {
  return request<IUserRoutes>({url: 'api/user-routes/'})
}

export async function createUser(formData: FormData) {
  const user = {
    id: '',
    userType: formData.get('userType'),
    name: formData.get('name'),
    surname: formData.get('surname'),
    socials: [],
    city: {
      id: formData.get('city_id')
    },
    lang: formData.get('lang')
  }
  return send<IDetailedUser>({url: 'api/user/', method: 'POST', data: user})
}

export async function sendAvatar(data: FormData) {
  return sendFile({url: 'api/user/', method: 'PATCH', data: data})
}

export async function deleteAvatar() {
  return send<undefined>({url: 'api/user/', method: 'DELETE'})
}