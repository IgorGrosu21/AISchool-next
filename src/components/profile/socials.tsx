'use server'

import { IDetailedUser, ISocial } from "@/utils/interfaces";
import { Facebook, Instagram } from "@mui/icons-material";
import { Stack, Typography, Divider } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface SocialsProps {
  user: IDetailedUser
}

export async function Socials({user}: SocialsProps) {
  let socials: Array<ISocial | null> = []
  user.socials.forEach(s => {
    socials.push(s)
    socials.push(null)
  })
  socials = socials.slice(0, -1)
  const t = await getTranslations('profile')

  return <Stack direction='row' gap={2}>
    <Typography variant='h6'>{t('socials')}:</Typography>
    <Stack direction='row' gap={2}>
      {socials.map((s, i) => s ? <Link key={i} target='_blank' href={s.link}>
        <Stack direction='row' gap={1} sx={{alignItems: 'center'}}>
        {
        s.type === 'fb'
        ?
        <>
          <Facebook color='primary' />
          <Typography variant="h6">Facebook</Typography>
        </>
        :
        <>
          <Instagram color='primary' />
          <Typography variant="h6">Instagram</Typography>
        </>
        }
        </Stack>
      </Link> : <Divider key={i} flexItem orientation='vertical' />)}
    </Stack>
  </Stack>
}