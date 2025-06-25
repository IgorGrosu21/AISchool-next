'use server'

import Image from "next/image";
import Link from "next/link";

import {
  HomeOutlined, AccountCircleOutlined, Group, School, 
  AutoStoriesOutlined, QuizOutlined, ClassOutlined, AutoStories,
  VideocamOutlined, EmojiEvents, SchoolOutlined,SellOutlined,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { fetchUserRoutes } from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { AuthButton } from "@/components";
import { logoutThis, verify } from "@/app/actions/auth";
import { getToken } from "@/app/actions/token";
import { RouteController } from "./routeController";

type Routes = Array<Array<{
  path: string,
  label?: string,
  icon: React.ReactNode
}>>

export async function SideBar() {
  let user;
  const access = await getToken()
  if (access) {
    user = await fetchUserRoutes()
  } else {
    user = undefined
  }

  const t = await getTranslations('components.sidebar');

  const routes: Routes = [
    [
      {path: '', label: t('home'), icon: <HomeOutlined color='primary' />},
    ],
    [
      {path: 'subjects', icon: <AutoStoriesOutlined color='secondary' />},
      {path: 'tests', icon: <QuizOutlined color='secondary' />},
    ],
    [
      {path: 'webinars', icon: <VideocamOutlined color='tertiary' />},
      {path: 'olimpiads', icon: <EmojiEvents color='tertiary' />},
      {path: 'universities', icon: <SchoolOutlined color='tertiary' />},
      {path: 'subscriptions', icon: <SellOutlined color='tertiary' />},
    ],
  ]

  if (user) {
    if (user.profileLink) {
      routes[0].push({path: user.profileLink, label: t('profile'), icon: <AccountCircleOutlined color='primary' />})
    }
    if (user.klassLink) {
      routes[0].push({path: user.klassLink, label: t('klass'), icon: <Group color='primary' />})
    }
    if (user.schoolLink) {
      routes[0].push({path: user.schoolLink, label: t('school'), icon: <School color='primary' />})
    }
    if (user.diaryLink) {
      routes[1].push({path: user.diaryLink, label: t('diary'), icon: <ClassOutlined color='secondary' />})
    }
    if (user.journalLink) {
      routes[1].push({path: user.journalLink, label: t('journal'), icon: <AutoStories color='secondary' />})
    }
  }

  return <Stack sx={{height: '100%', ...(user?.isAccountVerified || !user ?  {minWidth: '15vw'} : {maxWidth: '17.5vw'})}}>
    <Stack direction='row' sx={{p: 2, justifyContent: 'center', bgcolor: 'primary.dark'}}>
      <Image src='/images/logo-white.png' width={100} height={94} alt='light-logo' priority />
    </Stack>
    {user ? <Stack sx={{height: '100%', width: '100%', justifyContent: 'center'}}>
      <Stack gap={2} direction='row' sx={{p: 2, bgcolor: 'primary.main', alignItems: 'center'}}>
        <Link href={user.profileLink!} style={{display: 'flex', alignItems: 'center', pointerEvents: user.profileLink ? 'unset' : 'none'}} as='image'>
          <Image
            src={user.avatar ? `${user.avatar}` : '/images/default-avatar.png'}
            width={100}
            height={100}
            style={{borderRadius: '50%'}}
            alt='avatar'
            priority
          />
        </Link>
        <Stack sx={{flex: 1}}>
          <Typography variant='h6' color='primary.contrastText'>{user.name}</Typography>
          <Typography variant='h6' color='primary.contrastText'>{user.surname}</Typography>
        </Stack>
      </Stack>
      {user.isAccountVerified ? <Stack gap={4} sx={{p: 4}}>
        {routes.map((group, i) => <Stack key={i} gap={2}>
          {group.map((route, j) => <Link key={j} href={'/core/' + route.path}>
            <Stack direction='row' gap={1}>
              {route.icon}
              <Typography>{route.label ?? t(route.path)}</Typography>
            </Stack>
          </Link>)}
        </Stack>)}
      </Stack> : <Stack component='form' action={verify} gap={2} sx={{p: 4}}>
        <RouteController />
        <Typography variant='h6' sx={{textAlign: 'center', textWrap: 'wrap'}}>{t('unverified.label')}</Typography>
        <Typography sx={{textAlign: 'center', textWrap: 'wrap', whiteSpace: 'pre-wrap'}}>({t('unverified.helper')})</Typography>
        <AuthButton type='verify' variant='h6' />
      </Stack>}
      <Stack component='form' action={logoutThis} sx={{p: 4, flex: 1, justifyContent: 'flex-end'}}>
        <AuthButton type='logout' variant='h6' />
      </Stack>
    </Stack> : <Link href='/auth'>
      <Stack sx={{p: 4}}>
        <AuthButton type='login' variant='h6' />
      </Stack>
    </Link>}
  </Stack>
}