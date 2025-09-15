import { Typography } from '@mui/material'
import { NavigationContainer, Panel, Subjects } from '@/components'
import { getTranslations } from 'next-intl/server'
import { fetchKlass, fetchTeachedSubjects } from '@/utils/api'
import { redirect } from 'next/navigation'

export default async function TeacherJournalPage({ params }: { params: Promise<{id: string, schoolSlug: string, klassSlug: string}> }) {
  const { id, schoolSlug, klassSlug } = await params
  const subjects = await fetchTeachedSubjects(id, schoolSlug, klassSlug)
  const klass = await fetchKlass(schoolSlug, klassSlug)
  const t = await getTranslations('journal')

  if (subjects.length === 1) {
    return redirect(`/core/journal/teachers/${id}/${schoolSlug}/${klassSlug}/${subjects[0].slug}`)
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
