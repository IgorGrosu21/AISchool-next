export type IAuthUser = {
  email: string
  password: string
}

export type ITokens = {
  access: string
  refresh: string
}

export type IAuthError = {
  email?: string[]
  password?: string[]
}