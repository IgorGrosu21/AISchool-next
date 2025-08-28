import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{subjectSlug: string, moduleSlug: string, topicSlug: string}> }) {
  const { subjectSlug, moduleSlug, topicSlug } = await params;
  
  redirect(`/core/manuals/${subjectSlug}/${moduleSlug}/${topicSlug}`)
}