import { redirect } from '@/i18n'
import { format } from "date-fns"

export default async function Page({ params }: { params: Promise<{id: string, schoolSlug: string}> }) {
  const { id, schoolSlug } = await params

  const date = new Date(2025, 2, 25)
  await redirect(`/core/diary/teachers/${id}/${schoolSlug}/${format(date, 'y.M.d')}`)
}