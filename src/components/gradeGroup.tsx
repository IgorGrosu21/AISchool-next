'use server'

import { Stack, Typography, Grid2 } from "@mui/material"
import { getTranslations } from "next-intl/server"

interface GradeGroupProps<T> {
  collection: T[],
  circleSize: number,
  renderItem: (item: T) => React.ReactNode | React.ReactNode[]
}

export async function GradeGroup<T extends {grade: number}>({collection, circleSize, renderItem}: GradeGroupProps<T>) {
  const grades = Array.from({length: 12}, (_, i) => i + 1)
  const t = await getTranslations('klasses')

  let grouped = grades.map(grade => ({
    grade: grade,
    subGroup: [] as T[]
  }))

  collection.forEach(s => grouped.find(s1 => s1.grade === s.grade)?.subGroup.push(s))
  grouped = grouped.filter(g => g.subGroup.length > 0)

  return <Stack gap={8}>
    {grouped.length === 1 && <Stack sx={{p: 2, bgcolor: 'primary.main'}}>
      <Typography variant='h5' sx={{textAlign: 'center', color: 'primary.contrastText'}}>{grouped[0].grade} {t('singular')}</Typography>
    </Stack>}
    {grouped.map((group, i) => <Stack key={i} gap={4}>
      <Grid2 container spacing={4} columns={5}>
        {grouped.length > 1 && <Grid2 size={1}>
          <Stack sx={{height: '100%', alignItems: 'center'}}>
            <Stack sx={{bgcolor: 'primary.main', borderRadius: '50%', width: circleSize, aspectRatio: 1, justifyContent: 'center'}}>
              <Typography variant='h5' sx={{textAlign: 'center', color: 'primary.contrastText'}}>{group.grade} {t('singular')}</Typography>
            </Stack>
          </Stack>
        </Grid2>}
        {group.subGroup.map((item, j) => <Grid2 key={j} size={1}>
          {renderItem(item)}
        </Grid2>)}
      </Grid2>
    </Stack>)}
  </Stack>
}