import { redirect } from "next/navigation"
import { format } from "date-fns"

export default async function Page({ params }: { params: Promise<{id: string, schoolSlug: string}> }) {
  const { id, schoolSlug } = await params

  const date = new Date(2025, 2, 25)
  redirect(`/core/diary/students/${id}/${schoolSlug}/${format(date, 'y.M.d')}`)
}