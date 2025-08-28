'use server'

import { IKlassName } from "@/utils/interfaces";
import { Stack, Typography, Divider } from "@mui/material";
import Link from "next/link";

interface KlassListProps {
  klasses: IKlassName[],
  baseHref: string
}

export async function KlassList({klasses, baseHref}: KlassListProps) {
  const grades = Array.from({length: 12}, (_, i) => i + 1)
  const grouped = grades.map(grade => ({
    grade: grade,
    klasses: [] as IKlassName[]
  }))

  klasses.forEach(k => {
    const group = grouped.find(s1 => s1.grade === k.grade)
    if (group) {
      group.klasses.push(k)
    }
  })

  return <Stack gap={8}>
    {grades.filter(grade => grade < 7).map(grade => <Stack direction='row' key={grade} gap={8} sx={{width: '100%'}}>
      <Stack direction='row' gap={4} sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {grouped[grade - 1].klasses.map((klass, i) => <Link key={i} href={`/core/${baseHref}/${klass.slug}`}>
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
      </Stack>
      <Divider flexItem orientation='vertical' />
      <Stack direction='row' gap={4} sx={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {grouped[grade + 5].klasses.map((klass, i) => <Link key={i} href={`/core/${baseHref}/${klass.slug}`}>
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
      </Stack>
    </Stack>)}
  </Stack>
}