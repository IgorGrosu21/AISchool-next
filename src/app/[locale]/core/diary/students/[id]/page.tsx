import { redirect } from "next/navigation"
import { format } from "date-fns"
import { fetchStudent } from "@/utils/api"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const student = await fetchStudent(id)
  const klass = student.klass
  if (klass === undefined) {
    redirect(`/core/profile/students/${id}`)
  }
  const date = new Date(2025, 2, 25)
  redirect(`/core/diary/students/${id}/${klass.school.slug}/${format(date, 'y.M.d')}`)
}