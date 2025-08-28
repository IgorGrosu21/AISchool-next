import { NavigationContainer, SmallProfile } from "@/components"
import { fetchParent } from "@/utils/api"
import { Grid2, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const parent = await fetchParent(id)
  const t = await getTranslations('journal')
  
  return <NavigationContainer segments={[
    {label: t('singular'), href: 'journal'},
  ]} last={t('child')}>
    <Typography variant='h5'>{t('pick_child')}</Typography>
    <Grid2 container columns={3} spacing={8}>
      {parent.students.map((student, i) => <Grid2 key={i} size={1}>
        <Link href={`/core/journal/students/${student.id}`} style={{flex: 1}}>
          <SmallProfile user={student.user} disableLink />
        </Link>
      </Grid2>)}
    </Grid2>
  </NavigationContainer>
}