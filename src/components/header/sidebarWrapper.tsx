'use server'

import { errorHandler, fetchUserRoutes } from "@/requests";
import { getTranslations } from "next-intl/server";
import {
  HomeOutlined, AccountCircleOutlined, Group, School, 
  AutoStoriesOutlined, /*QuizOutlined,*/ ClassOutlined, AutoStories,
  //VideocamOutlined, EmojiEvents, SchoolOutlined,SellOutlined,
} from "@mui/icons-material"
import { SideBar } from "./sidebar";

export async function SideBarWrapper() {
  const [userRoutesRaw, status] = await fetchUserRoutes()
  const userRoutes = await errorHandler(userRoutesRaw, status)

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

  if (userRoutes.profileLink) {
    routes[0].push({path: userRoutes.profileLink, label: t('profile'), icon: <AccountCircleOutlined color='primary' />})
  }
  if (userRoutes.klassLink) {
    routes[0].push({path: userRoutes.klassLink, label: t('klass'), icon: <Group color='primary' />})
  }
  if (userRoutes.schoolLink) {
    routes[0].push({path: userRoutes.schoolLink, label: t('school'), icon: <School color='primary' />})
  }
  if (userRoutes.diaryLink) {
    routes[1].push({path: userRoutes.diaryLink, label: t('diary'), icon: <ClassOutlined color='secondary' />})
  }
  if (userRoutes.journalLink) {
    routes[1].push({path: userRoutes.journalLink, label: t('journal'), icon: <AutoStories color='secondary' />})
  }

  return <SideBar user={userRoutes} routes={routes} />
}