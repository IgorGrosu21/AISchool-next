'use server'

import {
  HomeOutlined, AccountCircleOutlined, Group, School, 
  AutoStoriesOutlined, /*QuizOutlined,*/ ClassOutlined, AutoStories,
  //VideocamOutlined, EmojiEvents, SchoolOutlined,SellOutlined,
} from "@mui/icons-material"
import { fetchUserRoutes } from "@/utils/api";
import { getToken } from "@/app/actions/token";
import { SideBar } from "./sidebar";
import { getTranslations } from "next-intl/server";

export async function SideBarWrapper() {
  let user;
  const access = await getToken()
  if (access) {
    user = await fetchUserRoutes()
  } else {
    user = undefined
  }
  const t = await getTranslations('components.sidebar')

  const routes = [
    [
      {path: '', label: t('home'), icon: <HomeOutlined color='primary' />},
    ],
    [
      {path: 'manuals', icon: <AutoStoriesOutlined color='secondary' />},
      //{path: 'tests', icon: <QuizOutlined color='secondary' />},
    ],
    /*
    [
      {path: 'webinars', icon: <VideocamOutlined color='tertiary' />},
      {path: 'olimpiads', icon: <EmojiEvents color='tertiary' />},
      {path: 'universities', icon: <SchoolOutlined color='tertiary' />},
      {path: 'subscriptions', icon: <SellOutlined color='tertiary' />},
    ],
    */
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

  return <SideBar user={user} routes={routes} />
}
