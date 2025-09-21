import { Stack, Typography } from '@mui/material'
import { errorHandler, fetchTeacherKlasses } from '@/utils/api'
import { KlassLink, NavigationContainer, Panel } from '@/components'
import { getTranslations } from 'next-intl/server'
import { IKlass } from '@/utils/interfaces'

export default async function TeacherJournalPage({ params }: { params: Promise<{id: string, schoolSlug: string}> }) {
  const { id, schoolSlug } = await params
  const [klassesRaw, status] = await fetchTeacherKlasses(schoolSlug, id)
  const klasses = await errorHandler(klassesRaw, status)
  const school = klasses[0].school
  const t = await getTranslations('journal')

  const grades = Array.from({length: 12}, (_, i) => i + 1)
  const grouped = grades.map(grade => ({
    grade: grade,
    klasses: [] as IKlass[]
  }))

  klasses.forEach(k => {
    const group = grouped.find(s1 => s1.grade === k.grade)
    if (group) {
      group.klasses.push(k)
    }
  })

  return <NavigationContainer segments={[
    {label: t('singular'), href: `journal/teachers/${id}`},
  ]} last={school.name}>
    <Panel sx={{flexGrow: 0}}>
      <Typography variant='h5'>{t('pick_klass')}</Typography>
    </Panel>
    <Stack gap={2}>
      {grouped.filter(g => g.klasses.length > 0).map((group, i) => <Stack key={i} gap={2} direction='row'>
        {group.klasses.map((klass, j) => <KlassLink
          key={j}
          baseHref={`/core/journal/teachers/${id}/${schoolSlug}`}
          klass={klass}
          big
        />)}
      </Stack>)}
    </Stack>
  </NavigationContainer>
}
