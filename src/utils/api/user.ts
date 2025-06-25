import type { IMedia, IDetailedUser, IUserRoutes } from "../interfaces"
import { request, requestWithRefresh } from "./client"

export function fetchUserRoutes() {
  return request<IUserRoutes>({url: 'api/user-routes/'})
}

export async function createUser(formData: FormData) {
  const user = {
    id: '',
    isTeacher: formData.get('isTeacher') === 'on',
    name: formData.get('name'),
    surname: formData.get('surname'),
    socials: [],
    city: {
      id: formData.get('city_id')
    },
    lang: formData.get('lang')
  }
  return requestWithRefresh<IDetailedUser>({url: 'api/user/', method: 'POST', data: user})
}

export async function sendAvatar(data: FormData) {
  return requestWithRefresh<IMedia>({url: 'api/user/', method: 'PATCH', data: data})
}

export async function deleteAvatar() {
  return requestWithRefresh<undefined>({url: 'api/user/', method: 'DELETE'})
}