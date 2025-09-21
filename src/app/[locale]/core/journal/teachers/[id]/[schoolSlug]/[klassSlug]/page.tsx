import { Typography } from '@mui/material'
import { NavigationContainer, Panel, Subjects } from '@/components'
import { getTranslations } from 'next-intl/server'
import { errorHandler, fetchKlass, fetchTeachedSubjects } from '@/utils/api'
import { redirect } from '@/i18n'

export default async function TeacherJournalPage({ params }: { params: Promise<{id: string, schoolSlug: string, klassSlug: string}> }) {
  const { id, schoolSlug, klassSlug } = await params
  const [[subjectsRaw, subjectsStatus], [klassRaw, klassStatus]] = await Promise.all([
    fetchTeachedSubjects(id, schoolSlug, klassSlug),
    fetchKlass(schoolSlug, klassSlug)
  ])
  const subjects = await errorHandler(subjectsRaw, subjectsStatus)
  const klass = await errorHandler(klassRaw, klassStatus)
  const t = await getTranslations('journal')

  if (subjects.length === 1) {
    await redirect(`/core/journal/teachers/${id}/${schoolSlug}/${klassSlug}/${subjects[0].slug}`)
  }

  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'},
    {label: klass.school.name, href: `teachers/${id}/${schoolSlug}`},
  ]} last={`${klass.grade}${klass.letter}`}>
    <Panel sx={{flexGrow: 0}}>
      <Typography variant='h5'>{t('pick_subject')}</Typography>
    </Panel>
    <Subjects subjects={subjects} showText={false} hrefTemplate={`/core/journal/teachers/${id}/${schoolSlug}/${klassSlug}/<subjectSlug>`} />
  </NavigationContainer>
}
