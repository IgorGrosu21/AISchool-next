import { ModuleHeader, NavigationContainer, TheoryButtons, PdfViewer } from "@/components";
import { errorHandler, fetchTopic } from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { redirect } from '@/i18n';
import { Stack } from "@mui/material";

export default async function Page({ params }: { params: Promise<{manualSlug: string, moduleSlug: string, topicSlug: string, theorySlug: string}> }) {
  const { manualSlug, moduleSlug, topicSlug, theorySlug } = await params;
  const [topicRaw, status] = await fetchTopic(manualSlug, moduleSlug, topicSlug)
  const topic = await errorHandler(topicRaw, status)
  const t = await getTranslations('manuals')

  const theory = topic.theories.find(t => t.slug === theorySlug)
  const detailedModule = topic.module //next.js error: do not assign to module variable
  const manual = detailedModule.manual

  if (theory === undefined) {
    return await redirect(`/core/manuals/${manualSlug}/${moduleSlug}/${topicSlug}`)
  }

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'manuals'},
      {label: `${manual.subject.verboseName} ${manual.grade}`, href: manualSlug},
      {label: detailedModule.name, href: moduleSlug},
      {label: topic.name, href: topicSlug},
    ]} last={theory.name}>
    <Stack gap={4}>
      <ModuleHeader title={theory.name} progress={topic.progress} />
      <Stack sx={{alignItems: 'center', bgcolor: 'background.default', p: 2}}>
        <PdfViewer link={`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/public/theories/${manualSlug}/${moduleSlug}/${topicSlug}/${theorySlug}.pdf`} />
      </Stack>
      <TheoryButtons topic={topic} theory={theory} />
    </Stack>
  </NavigationContainer>
}