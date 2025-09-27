'use server'

import { Stack, Typography } from '@mui/material'
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Socials } from './socials';
import { IDetailedUser } from '@/interfaces';
import { NavigationContainer } from '../navigationContainer';
import { Panel } from '@/ui';
import { Title } from '../editable';
import { ThemeImage } from '../themeImage';

interface ProfileProps extends React.PropsWithChildren {
  user: IDetailedUser
  headerChildren: React.ReactNode | React.ReactNode[],
}

export async function Profile({user, headerChildren, children}: ProfileProps) {
  const t = await getTranslations('profile')
  
  return <NavigationContainer segments={[]} last={`${user.name} ${user.surname}`}>
    <Title
      label={`${t('title')} ${t(user.profileLink!.split('/')[1])}`}
      link={`/core/${user.profileLink}`}
      editable={user}
    />
    <Stack gap={4} direction={{ xs: 'column', md: 'row' }} sx={{alignItems: 'center'}}>
      <Panel sx={{flexGrow: 0, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <Stack sx={{
          border: 1,
          borderColor: 'primary.main',
          borderRadius: '50%',
          width: { xs: 150, md: 200 },
          height: { xs: 150, md: 200 },
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }}>
          <ThemeImage
            srcDark={user.avatar ? user.avatar : '/images/default-avatar-dark.png'}
            srcLight={user.avatar ? user.avatar : '/images/default-avatar-light.png'}
            alt='avatar'
            width={200}
            height={200}
            style={{ 
              borderRadius: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        </Stack>
      </Panel>
      <Panel gap={4} sx={{justifyContent: 'center'}}>
        <Typography variant='h5' sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          {user.name} {user.surname}
        </Typography>
        <Stack direction='row' gap={1} sx={{
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          <Image 
            loading='lazy' 
            width={40} 
            height={20} 
            src={user.city.region.country.flag} 
            alt='' 
          />
          <Typography variant='h6' sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
            {user.city.region.country.name}, {user.city.name}
          </Typography>
        </Stack>
        {headerChildren}
        <Socials user={user} />
      </Panel>
    </Stack>
    <Stack gap={{ xs: 6, md: 8 }}>
      {children}
    </Stack>
  </NavigationContainer>
}