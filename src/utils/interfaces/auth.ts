export type IAuthUser = {
  email: string
  password: string
}

export type ITokens = {
  access: string
  refresh: string
}

export type IError = {
  type: 'validation_error' | 'client_error' | 'server_error',
  errors: Array<{
    code: string
    detail: string
    attr?: string
  }>
}