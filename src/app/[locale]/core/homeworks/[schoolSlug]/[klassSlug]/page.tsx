import { redirect } from '@/i18n'

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params

  await redirect(`/core/schools${schoolSlug}/klasses/${klassSlug}`)
}