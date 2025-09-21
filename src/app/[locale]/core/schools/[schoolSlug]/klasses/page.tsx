import { KlassLink, NavigationContainer, Title } from "@/components"
import { errorHandler, fetchSchoolWithKlasses } from "@/utils/api"
import { IKlassName } from "@/utils/interfaces"
import { Divider, Stack } from "@mui/material"
import { getTranslations } from "next-intl/server"

const grades = Array.from({length: 12}, (_, i) => i + 1)

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const [schoolRaw, status] = await fetchSchoolWithKlasses(schoolSlug)
  const school = await errorHandler(schoolRaw, status)
  const t = await getTranslations('klasses');
  const grouped = grades.map(grade => ({
    grade: grade,
    klasses: [] as IKlassName[]
  }))

  school.klasses.forEach(k => {
    const group = grouped.find(s1 => s1.grade === k.grade)
    if (group) {
      group.klasses.push(k)
    }
  })
  
  return <NavigationContainer segments={[
      {label: t('school_list'), href: 'schools'},
      {label: school.name, href: schoolSlug}
    ]} last={t('list')}>
    <Title label={t('list')} link={`/core/schools/${schoolSlug}/klasses`} editable={school} />
    <Stack gap={8}>
      {grades.filter(grade => grade < 7).map(grade => <Stack direction='row' key={grade} gap={8} sx={{width: '100%'}}>
        <Stack direction={{xs: 'column', md: 'row'}} gap={4} sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {grouped[grade - 1].klasses.map((klass, i) => <KlassLink key={i} baseHref={`/core/schools/${schoolSlug}/klasses`} klass={klass} big />)}
        </Stack>
        <Divider flexItem orientation='vertical' />
        <Stack direction={{xs: 'column', md: 'row'}} gap={4} sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {grouped[grade + 5].klasses.map((klass, i) => <KlassLink key={i} baseHref={`/core/schools/${schoolSlug}/klasses`} klass={klass} big />)}
        </Stack>
      </Stack>)}
    </Stack>
  </NavigationContainer>
}