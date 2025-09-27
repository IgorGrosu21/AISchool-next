import { NavigationContainer, TeacherPositions } from "@/components"
import { Panel } from "@/ui"
import { errorHandler, fetchTeacher } from "@/requests"
import { Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const [teacherRaw, status] = await fetchTeacher(id)
  const teacher = await errorHandler(teacherRaw, status)
  const t = await getTranslations('journal')

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'},
  ]} last={t('school')}>
    <Panel>
      <Typography variant='h5'>{t('pick_school')}</Typography>
    </Panel>
    <TeacherPositions positions={teacher.workPlaces} link={slug => `/core/journal/teachers/${id}/${slug}`} />
  </NavigationContainer>
}