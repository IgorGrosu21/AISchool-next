'use server'

import { Home } from "@mui/icons-material"
import { Breadcrumbs, Stack, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

interface NavigationContainerProps {
  segments: Array<{
    label: string
    href: string
  }>
  last: string
  applyStyles?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export async function NavigationContainer({segments, last, applyStyles = true, children}: NavigationContainerProps) {
  const t = await getTranslations('components.edit');

  for (let i = 1; i < segments.length; i++) {
    const [prev, curr] = segments.slice(i - 1, i + 1).map(s => s.href)
    if (curr.startsWith(prev)) {
      continue
    }
    segments[i].href = `${prev}/${curr}`
  }

  return <Stack gap={8} sx={{flex: 1, p: 16, pt: 8}}>
    <Breadcrumbs sx={{
      ['& ol']: {
        alignItems: 'center'
      },
      ['& ol > li:first-child']: {
        lineHeight: 1
      },
      ['& ol > li > a']: {
        transition: '0.5s',
        [':hover']: {
          color: 'primary.main'
        }
      }
    }}>
      <Link href='/core'>
        <Home sx={{color: last === '' ? 'primary.main' : 'inherit'}} />
      </Link>
      {segments.map((segment, i) => <Link key={i} href={'/core/' + segment.href}>
        {segment.label}
      </Link>)}
      {last !== '' && <Typography color='primary'>{last === 'edit' ? t('edit') : last}</Typography>}
    </Breadcrumbs>
    <Stack sx={{height: '100%', width: '100%', bgcolor: applyStyles ? 'background.default' : 'inherit'}}>
      {applyStyles ? <Stack gap={8} sx={{p: 4, height: '100%'}}>
        {children}
      </Stack> : children}
    </Stack>
  </Stack>
}