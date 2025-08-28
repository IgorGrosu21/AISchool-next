import { NavigationContainer, TeacherPositions } from "@/components"
import { fetchTeacher } from "@/utils/api"
import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const teacher = await fetchTeacher(id)
  const t = await getTranslations('journal')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'},
  ]} last={t('school')}>
    <Typography variant='h5'>{t('pick_school')}</Typography>
    <TeacherPositions positions={teacher.workPlaces} link={slug => `/core/journal/teachers/${id}/${slug}`} />
  </NavigationContainer>
}