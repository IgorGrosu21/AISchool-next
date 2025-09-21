import { Currency, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { errorHandler, fetchTopic } from "@/utils/api";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{manualSlug: string, moduleSlug: string, topicSlug: string}> }) {
  const { manualSlug, moduleSlug, topicSlug } = await params;
  const [topicRaw, status] = await fetchTopic(manualSlug, moduleSlug, topicSlug)
  const topic = await errorHandler(topicRaw, status)
  const t = await getTranslations('manuals')

  const detailedModule = topic.module //next.js error: do not assign to module variable
  const manual = detailedModule.manual

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'manuals'},
      {label: `${manual.subject.verboseName} ${manual.grade}`, href: manualSlug},
      {label: detailedModule.name, href: moduleSlug}
    ]} last={topic.name}>
    <ModuleHeader title={topic.name} progress={topic.progress} balance={topic.balance} />
    <ModuleList
      list={topic.theories}
      baseLink={`${manualSlug}/${moduleSlug}/${topicSlug}/theories`}
    >
      {t('theories')}
    </ModuleList>
    <ModuleList
      list={topic.tasks}
      baseLink={`${manualSlug}/${moduleSlug}/${topicSlug}/tasks`}
      renderCost={priceable => <Currency stone={priceable.currency} quantity={priceable.cost} />}
    >
      {t('tasks')}
    </ModuleList>
  </NavigationContainer>
}