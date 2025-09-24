import type { IAuthUser, ITokens } from "../interfaces"
import { deleteAllCache, request, send } from "./client"
import { getToken } from "@/app/actions";

export async function sendAuthUser(type: string, data: IAuthUser) {
  deleteAllCache()
  return request<ITokens>({url: `auth/${type}/`, method: 'POST', data: data})
}

export async function sendLogoutRequest(all = false) {
  const refresh = await getToken('refresh')
  
  deleteAllCache()
  return request<undefined>({url: `auth/logout${all ? '-all' : ''}/`, method: 'POST', data: { refresh: refresh }})
}

export async function sendVerificationEmail() {
  return send({url: `auth/send-verification/`, method: 'POST', cache: { update: {
    'get_api/user-routes/': 'delete'
  }}})
}