import { ModuleHeader, NavigationContainer, TheoryButtons } from "@/components";
import { fetchTopic } from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { PdfViewer } from "@/components";
import { Stack } from "@mui/material";

export default async function Page({ params }: { params: Promise<{subjectSlug: string, moduleSlug: string, topicSlug: string, theorySlug: string}> }) {
  const { subjectSlug, moduleSlug, topicSlug, theorySlug } = await params;
  const topic = await fetchTopic(subjectSlug, moduleSlug, topicSlug)
  const t = await getTranslations('subjects')

  const theory = topic.theories.find(t => t.slug === theorySlug)
  const detailedModule = topic.module //next.js error: do not assign to module variable
  const subject = detailedModule.subject

  if (theory === undefined) {
    redirect(`/core/subjects/${subjectSlug}/${moduleSlug}/${topicSlug}`)
  }

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'subjects'},
      {label: `${subject.name.verboseName} ${subject.grade}`, href: subjectSlug},
      {label: detailedModule.name, href: moduleSlug},
      {label: topic.name, href: topicSlug},
    ]} last={theory.name}>
    <ModuleHeader title={theory.name} progress={topic.progress} currency={{ stone: theory.currency, quantity: theory.cost }} />
    <Stack sx={{alignItems: 'center'}}>
      <PdfViewer link={`${process.env.NEXT_PUBLIC_DJANGO_HOST}/media/theories/${subjectSlug}/${moduleSlug}/${topicSlug}/${theorySlug}.pdf`} />
    </Stack>
    <TheoryButtons topic={topic} theory={theory} />
  </NavigationContainer>
}