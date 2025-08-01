'use server'

import { redirect } from "next/navigation"

import { sendAuthUser, createUser, sendLogoutRequest, sendVerificationEmail } from "@/utils/api";
import { AxiosError } from "axios";
import { deleteTokens, setTokens } from "./token";
import { IAuthError } from "@/utils/interfaces";

export type FormState = {
  email: {
    value: string
    error: string
  }
  password: {
    value: string
    error: string
  }
}

export async function auth(state: FormState, formData: FormData): Promise<FormState> {
  const type = formData.get('type') as string
  formData.delete('type')
  const authUser = JSON.parse(JSON.stringify({ email: formData.get('email'), password: formData.get('password') }))
  const newState = { email: { value: authUser.email, error: '' }, password: { value: authUser.password, error: '' } }

  try {
    const res = await sendAuthUser(type, authUser)
    await setTokens(res)
    formData.delete('email')
    formData.delete('password')
    switch (type) {
      case 'signup': {
        const user = await createUser(formData)
        if (user) {
          redirect(`/core/${user.profileLink}`)
        }
        break
      }
      case 'login': {
        redirect('/core')
      }
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const response = (error as AxiosError<IAuthError>).response
      if (response) {
        return {
          email: {...newState.email, error: response.data.email ? response.data.email[0] : ''},
          password: {...newState.password, error: response.data.password ? response.data.password[0] : ''}
        }
      }
    }
  }
  return newState
}

async function logout(all = false) {
  await sendLogoutRequest(all)
  await deleteTokens()
  redirect('/auth')
}

export async function logoutThis() {
  await logout()
}

export async function logoutAll() {
  await logout(true)
}

export async function verify() {
  await sendVerificationEmail()
}