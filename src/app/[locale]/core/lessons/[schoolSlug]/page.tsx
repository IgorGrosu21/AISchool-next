import { redirect } from '@/i18n'

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params

  await redirect(`/core/schools/${schoolSlug}`)
}