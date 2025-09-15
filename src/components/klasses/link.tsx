'use client'

import { Stack, Typography } from "@mui/material"
import Link from "next/link"

interface KlassLinkProps {
  baseHref: string
  klass: { grade: number, letter: string, slug: string }
  big?: boolean
}

export function KlassLink({baseHref, klass, big}: KlassLinkProps) {
  return <Link href={`${baseHref}/${klass.slug}`}>
    <Stack sx={{
      bgcolor: 'primary.main',
      borderRadius: '15%',
      height: big ? 100 : 67.5,
      aspectRatio: 1,
      justifyContent: 'center',
    }}>
      <Typography variant={big ? 'h5' : 'h6'} sx={{color: 'primary.contrastText', textAlign: 'center'}}>{klass.grade}{klass.letter}</Typography>
    </Stack>
  </Link>
}