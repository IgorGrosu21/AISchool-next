import { redirect } from '@/i18n';

export default async function Page({ params }: { params: Promise<{subjectSlug: string, moduleSlug: string, topicSlug: string}> }) {
  const { subjectSlug, moduleSlug, topicSlug } = await params;
  
  await redirect(`/core/manuals/${subjectSlug}/${moduleSlug}/${topicSlug}`)
}