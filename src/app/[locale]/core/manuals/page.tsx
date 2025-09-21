import { NavigationContainer, Subjects } from "@/components";
import { errorHandler, fetchManuals } from "@/utils/api";
import { IManual } from "@/utils/interfaces";
import { Grid2, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const [manualsRaw, status] = await fetchManuals()
  const manuals = await errorHandler(manualsRaw, status)
  const t = await getTranslations('manuals');
  const tKlasses = await getTranslations('klasses')

  const grades = Array.from({length: 12}, (_, i) => i + 1)

  let grouped = grades.map(grade => ({
    grade: grade,
    subGroup: [] as IManual[]
  }))

  manuals.forEach(s => grouped.find(s1 => s1.grade === s.grade)?.subGroup.push(s))
  grouped = grouped.filter(g => g.subGroup.length > 0)

  return <NavigationContainer segments={[]} last={t('plural')}>
    <Typography variant='h4'>{t('plural')}</Typography>
    <Stack gap={8}>
      {grouped.length === 1 && <Stack sx={{p: 2, bgcolor: 'primary.main'}}>
        <Typography variant='h5' sx={{textAlign: 'center', color: 'primary.contrastText'}}>{grouped[0].grade} {tKlasses('singular')}</Typography>
      </Stack>}
      {grouped.map((group, i) => <Stack key={i} gap={4}>
        <Grid2 container spacing={4} columns={{xs: 2, md: 5}}>
          {grouped.length > 1 && <Grid2 size={1}>
            <Stack sx={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Stack sx={{bgcolor: 'primary.main', borderRadius: '50%', width: {xs: 123, md: 164}, aspectRatio: 1, justifyContent: 'center'}}>
                <Typography variant='h5' sx={{textAlign: 'center', color: 'primary.contrastText'}}>{group.grade} {tKlasses('singular')}</Typography>
              </Stack>
            </Stack>
          </Grid2>}
          <Grid2 size='grow'>
            <Subjects
              subjects={group.subGroup.map(s => s.subject)}
              showText={false}
              hrefTemplate={`/core/manuals/<subjectSlug>-${group.grade}`}
            />
          </Grid2>
        </Grid2>
      </Stack>)}
    </Stack>
  </NavigationContainer>
}