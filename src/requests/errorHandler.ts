import { redirect } from '@/i18n'

export async function errorHandler<T>(data: T | undefined, status: number): Promise<T> {
  if (data) {
    return data
  }

  switch (status) {
    case 401:
      return redirect('/auth')
    case 403:
      return redirect('/forbidden')
    case 404:
      return redirect('/not-found')
    default:
      return redirect('/error')
  }
}