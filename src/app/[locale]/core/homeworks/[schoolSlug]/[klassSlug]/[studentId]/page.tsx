import { redirect } from '@/i18n'

export default async function Page({ params }: { params: Promise<{studentId: string}> }) {
  const { studentId } = await params

  await redirect(`/core/profile/students/${studentId}`)
}