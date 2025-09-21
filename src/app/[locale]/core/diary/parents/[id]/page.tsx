import { NavigationContainer, SmallProfile } from "@/components"
import { errorHandler, fetchParent } from "@/utils/api"
import { Grid2, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import { Link } from '@/i18n'

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const [parentRaw, status] = await fetchParent(id)
  const parent = await errorHandler(parentRaw, status)
  const t = await getTranslations('diary')
  
  return <NavigationContainer segments={[
    {label: t('singular'), href: 'diary'},
  ]} last={t('child')}>
    <Typography variant='h5'>{t('pick_child')}</Typography>
    <Grid2 container columns={3} spacing={8}>
      {parent.students.map((student, i) => <Grid2 key={i} size={1}>
        <Link href={`/core/diary/students/${student.id}`} style={{flex: 1}}>
          <SmallProfile user={student.user} disableLink />
        </Link>
      </Grid2>)}
    </Grid2>
  </NavigationContainer>
}