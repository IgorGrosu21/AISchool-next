import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{schoolSlug: string, klassSlug: string}> }) {
  const { schoolSlug, klassSlug } = await params

  redirect(`/core/schools/${schoolSlug}/klasses/${klassSlug}`)
}