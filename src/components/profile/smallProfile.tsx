'use client'

import { Stack, Typography } from "@mui/material";
import { Link } from '@/i18n';
import Image from "next/image";
import { IUser } from "@/interfaces";

interface SmallProfileProps {
  user: IUser
  disableLink?: boolean
  extraSmall?: boolean
}

export function SmallProfile({user, disableLink = false, extraSmall = false}: SmallProfileProps) {
  const content = <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
    <Image 
      src={user.avatar ?? '/images/default-avatar.png'}
      width={extraSmall ? 75 : 100}
      height={extraSmall ? 75 : 100}
      style={{borderRadius: '50%'}}
      alt='avatar'
      loading="lazy"
    />
    <Stack sx={{alignItems: 'flex-start'}}>
      <Typography color='textPrimary' variant='h6'>{user.name}</Typography>
      <Typography color='textPrimary' variant='h6'>{user.surname}</Typography>
    </Stack>
  </Stack>

  if (disableLink) {
    return content
  }

  return <Link href={`/core/${user.profileLink}`} style={{display: 'flex', alignItems: 'center'}}>
    {content}
  </Link>
}