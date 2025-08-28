import { Link, Stack, Typography } from '@mui/material'
import { fetchTeacherKlasses } from '@/utils/api'
import { NavigationContainer } from '@/components'
import { getTranslations } from 'next-intl/server'
import { IKlass } from '@/utils/interfaces'

export default async function TeacherJournalPage({ params }: { params: Promise<{id: string, schoolSlug: string}> }) {
  const { id, schoolSlug } = await params
  const klasses = await fetchTeacherKlasses(schoolSlug, id)
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
    <Typography variant='h5'>{t('pick_klass')}</Typography>
    <Stack gap={2}>
      {grouped.filter(g => g.klasses.length > 0).map((group, i) => <Stack key={i} gap={2}>
        {group.klasses.map((klass, j) => <Link key={j} href={`/core/journal/teachers/${id}/${schoolSlug}/${klass.slug}`}>
          <Stack sx={{
            bgcolor: 'primary.main',
            borderRadius: '15%',
            width: 100,
            aspectRatio: 1,
            justifyContent: 'center',
          }}>
            <Typography variant='h5' sx={{color: 'primary.contrastText', textAlign: 'center'}}>{klass.grade}{klass.letter}</Typography>
          </Stack>
        </Link>)}
      </Stack>)}
    </Stack>
  </NavigationContainer>
}
