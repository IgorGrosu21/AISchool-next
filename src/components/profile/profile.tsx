'use server'

import { Stack, Typography, Divider } from '@mui/material'
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Socials } from './socials';
import { IDetailedUser } from '@/utils/interfaces';
import { EditButton } from '../editButton';
import { NavigationContainer } from '../navigationContainer';

interface ProfileProps {
  user: IDetailedUser
  headerChildren: React.ReactNode | React.ReactNode[],
  children: React.ReactNode | React.ReactNode[]
}

export async function Profile({user, headerChildren, children}: ProfileProps) {
  const t = await getTranslations('profile')
  
  return <NavigationContainer segments={[]} last={`${user.name} ${user.surname}`}>
    <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant='h4'>{t('title')} {t(user.profileLink!.split('/')[0])}</Typography>
      <EditButton link={`/core/${user.profileLink}`} editable={user} />
    </Stack>
    <Stack gap={4} direction='row' sx={{ justifyContent: 'space-between' }}>
      <Stack sx={{
        border: 1,
        borderColor: 'primary.main',
        borderRadius: '50%',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image src={user.avatar ?? '/images/default-avatar.png'} width={200} height={200} style={{ borderRadius: '50%' }} alt='avatar' priority />
      </Stack>
      <Divider orientation='vertical' flexItem />
      <Stack gap={4} sx={{flex: 1, justifyContent: 'space-evenly'}}>
        <Typography variant='h5'>{user.name} {user.surname}</Typography>
        <Stack direction='row' sx={{alignItems: 'center'}} gap={1}>
          <Image loading='lazy' width={40} height={20} src={user.city.region.country.flag} alt='' />
          <Typography variant='h6'>{user.city.region.country.name}, {user.city.name}</Typography>
        </Stack>
        {headerChildren}
        <Socials user={user} />
      </Stack>
    </Stack>
    {children}
  </NavigationContainer>
}