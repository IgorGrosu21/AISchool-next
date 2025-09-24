import { redirect } from '@/i18n'
import { format } from "date-fns"
import { errorHandler, fetchStudent } from "@/requests"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const [studentRaw, status] = await fetchStudent(id)
  const student = await errorHandler(studentRaw, status)
  const klass = student.klass
  if (klass === undefined) {
    return await redirect(`/core/profile/students/${id}`)
  }
  const date = new Date(2025, 2, 25)
  await redirect(`/core/diary/students/${id}/${klass.school.slug}/${format(date, 'y.M.d')}`)
}