import { Currency, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { fetchTopic } from "@/utils/api";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{subjectSlug: string, moduleSlug: string, topicSlug: string}> }) {
  const { subjectSlug, moduleSlug, topicSlug } = await params;
  const topic = await fetchTopic(subjectSlug, moduleSlug, topicSlug)
  const t = await getTranslations('subjects')

  const detailedModule = topic.module //next.js error: do not assign to module variable
  const subject = detailedModule.subject

  const priceablesList = [
    { type: 'theories', list: topic.theories },
    { type: 'tasks', list: topic.tasks }
  ]

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'subjects'},
      {label: `${subject.name.verboseName} ${subject.grade}`, href: subjectSlug},
      {label: detailedModule.name, href: moduleSlug}
    ]} last={topic.name}>
    <ModuleHeader title={topic.name} progress={topic.progress} balance={topic.balance} />
    {priceablesList.map((priceables, i) => <ModuleList
      key={i}
      list={priceables.list}
      baseLink={`${subjectSlug}/${moduleSlug}/${topicSlug}/${priceables.type}`}
      renderCost={
      priceable => <Currency stone={priceable.currency} quantity={priceable.cost} />
    }>
      {t(priceables.type)}
    </ModuleList>)}
  </NavigationContainer>
}