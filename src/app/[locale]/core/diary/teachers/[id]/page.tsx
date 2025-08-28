import { NavigationContainer, TeacherPositions } from "@/components"
import { fetchTeacher } from "@/utils/api"
import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import { format } from "date-fns"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const teacher = await fetchTeacher(id)
  const t = await getTranslations('diary')
  const date = new Date(2025, 2, 25)

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'diary'},
  ]} last={t('school')}>
    <Typography variant='h5'>{t('pick_school')}</Typography>
    <TeacherPositions positions={teacher.workPlaces} link={slug => `/core/diary/teachers/${id}/${slug}/${format(date, 'y.M.d')}`} />
  </NavigationContainer>
}