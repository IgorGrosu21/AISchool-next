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
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography 
        variant='h4'
        sx={{ 
          textAlign: { xs: 'center', md: 'left' },
          fontSize: { xs: '1.5rem', md: '2.125rem' }
        }}
      >
        {t('title')} {t(user.profileLink!.split('/')[1])}
      </Typography>
      <EditButton link={`/core/${user.profileLink}`} editable={user} />
    </Stack>
    <Stack 
      gap={{ xs: 4, md: 4 }} 
      direction={{ xs: 'column', md: 'row' }} 
      sx={{ 
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' }
      }}
    >
      <Stack sx={{
        border: 1,
        borderColor: 'primary.main',
        borderRadius: '50%',
        width: { xs: 150, md: 200 },
        height: { xs: 150, md: 200 },
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: { xs: 'center', md: 'flex-start' }
      }}>
        <Image 
          src={user.avatar ?? '/images/default-avatar.png'} 
          width={200} 
          height={200} 
          style={{ 
            borderRadius: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} 
          alt='avatar' 
          priority 
        />
      </Stack>
      <Divider 
        orientation='vertical'
        flexItem 
        sx={{ 
          width: { xs: '100%', md: 'auto' },
          height: { xs: 'auto', md: '100%' },
          display: { xs: 'block', md: 'block' }
        }}
      />
      <Stack 
        gap={{ xs: 3, md: 4 }} 
        sx={{
          flex: 1, 
          justifyContent: 'space-evenly',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Typography 
          variant='h5'
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
        >
          {user.name} {user.surname}
        </Typography>
        <Stack 
          direction='row' 
          sx={{
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' }
          }} 
          gap={1}
        >
          <Image 
            loading='lazy' 
            width={40} 
            height={20} 
            src={user.city.region.country.flag} 
            alt='' 
          />
          <Typography 
            variant='h6'
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {user.city.region.country.name}, {user.city.name}
          </Typography>
        </Stack>
        {headerChildren}
        <Socials user={user} />
      </Stack>
    </Stack>
    {children}
  </NavigationContainer>
}