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
  children: React.ReactNode | React.ReactNode[]
}

export async function NavigationContainer({segments, last, children}: NavigationContainerProps) {
  const t = await getTranslations('components.edit');

  for (let i = 1; i < segments.length; i++) {
    const [prev, curr] = segments.slice(i - 1, i + 1).map(s => s.href)
    if (curr.startsWith(prev)) {
      continue
    }
    segments[i].href = `${prev}/${curr}`
  }

  return <Stack gap={{ xs: 4, md: 8 }} sx={{flex: 1, p: { xs: 2, md: 16 }, pt: { xs: 4, md: 8 }}}>
    <Breadcrumbs sx={{
      ['& ol']: {
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: { xs: 1, md: 0 }
      },
      ['& ol > li:first-child']: {
        lineHeight: 1
      },
      ['& ol > li > a']: {
        transition: '0.5s',
        fontSize: { xs: '0.875rem', md: 'inherit' },
        [':hover']: {
          color: 'primary.main'
        }
      },
      ['& ol > li']: {
        fontSize: { xs: '0.875rem', md: 'inherit' }
      }
    }}>
      <Link href='/core'>
        <Home sx={{
          color: last === '' ? 'primary.main' : 'inherit',
          fontSize: { xs: '1.25rem', md: 'inherit' }
        }} />
      </Link>
      {segments.map((segment, i) => <Link key={i} href={'/core/' + segment.href}>
        {segment.label}
      </Link>)}
      {last !== '' && <Typography 
        color='primary' 
        sx={{ fontSize: { xs: '0.875rem', md: 'inherit' } }}
      >
        {last === 'edit' ? t('edit') : last}
      </Typography>}
    </Breadcrumbs>
    <Stack gap={{ xs: 4, md: 8 }} sx={{height: '100%', width: '100%', overflow: { xs: 'auto', md: 'visible' }}}>
      {children}
    </Stack>
  </Stack>
}