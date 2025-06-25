import { Balance, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { fetchModule } from "@/utils/api";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Promise<{subjectSlug: string, moduleSlug: string}> }) {
  const { subjectSlug, moduleSlug } = await params;
  const detailedModule = await fetchModule(subjectSlug, moduleSlug) //next.js error: do not assign to module variable
  const t = await getTranslations('subjects');

  const subject = detailedModule.subject

  return <NavigationContainer segments={[
      {label: t('plural'), href: 'subjects'},
      {label: `${subject.name.verboseName} ${subject.grade}`, href: subjectSlug}
    ]} last={detailedModule.name}>
    <ModuleHeader title={detailedModule.name} progress={detailedModule.progress} balance={detailedModule.balance} />
    <ModuleList list={detailedModule.topics} baseLink={`${subjectSlug}/${moduleSlug}`} renderCost={
      topic => <Balance balance={topic.balance} showText={false} hideZeros />
    }>
      {t('topics')}
    </ModuleList>
  </NavigationContainer>
}