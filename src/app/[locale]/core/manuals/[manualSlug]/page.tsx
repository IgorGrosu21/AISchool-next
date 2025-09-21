import { Balance, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { errorHandler, fetchManual } from "@/utils/api";
import { Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n';

export default async function Page({ params }: { params: Promise<{manualSlug: string}> }) {
  const { manualSlug } = await params;
  const [manualRaw, status] = await fetchManual(manualSlug)
  const manual = await errorHandler(manualRaw, status)
  const t = await getTranslations('manuals');

  return <NavigationContainer segments={[
    {label: t('plural'), href: 'manuals'}
  ]} last={`${manual.subject.verboseName} ${manual.grade}`}>
    <ModuleHeader title={`${manual.subject.verboseName} ${manual.grade}`} progress={manual.progress} />
    {manual.modules.map((module, i) => <ModuleList
      key={i}
      list={module.topics}
      baseLink={`${manualSlug}/${module.slug}`}
      renderCost={topic => <Balance balance={topic.balance} showText={false} hideZeros />}
      complex
    >
      <Link style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} href={`/core/manuals/${manualSlug}/${module.slug}`}>
        <Typography variant='h5'>{i + 1}. {module.name}</Typography>
        <Balance balance={module.balance} showText={false} hideZeros />
      </Link>
    </ModuleList>)}
  </NavigationContainer>
}