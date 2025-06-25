import { Balance, ModuleHeader, ModuleList, NavigationContainer } from "@/components";
import { fetchSubject } from "@/utils/api";
import { Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{subjectSlug: string}> }) {
  const { subjectSlug } = await params;
  const subject = await fetchSubject(subjectSlug)
  const t = await getTranslations('subjects');

  return <NavigationContainer segments={[{label: t('plural'), href: 'subjects'}]} last={`${subject.name.verboseName} ${subject.grade}`}>
    <ModuleHeader title={`${subject.name.verboseName} ${subject.grade}`} progress={subject.progress} />
    {subject.modules.map((module, i) => <ModuleList
      key={i}
      list={module.topics}
      baseLink={`${subjectSlug}/${module.slug}`}
      renderCost={topic => <Balance balance={topic.balance} showText={false} hideZeros />}
      complex={true}
    >
      <Link style={{flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}} href={`/core/subjects/${subjectSlug}/${module.slug}`}>
        <Typography variant='h5'>{i + 1}. {module.name}</Typography>
        <Balance balance={module.balance} showText={false} hideZeros />
      </Link>
    </ModuleList>)}
  </NavigationContainer>
}