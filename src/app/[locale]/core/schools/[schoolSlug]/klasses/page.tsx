import { EditButton, KlassList, NavigationContainer } from "@/components"
import { fetchSchoolWithKlasses } from "@/utils/api"
import { Stack, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params
  const school = await fetchSchoolWithKlasses(schoolSlug)
  const t = await getTranslations('klasses');
  
  return <NavigationContainer segments={[
      {label: t('school_list'), href: 'schools'},
      {label: school.name, href: schoolSlug}
    ]} last={t('list')}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant='h4'>{t('list')}</Typography>
      <EditButton link={`/core/schools/${schoolSlug}/klasses`} editable={school} />
    </Stack>
    <KlassList klasses={school.klasses} baseHref={`schools/${schoolSlug}/klasses`} />
  </NavigationContainer>
}