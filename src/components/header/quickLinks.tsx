'use client'

import { Button, Link, Typography } from "@mui/material"
import { usePathname } from "@/i18n"
import { useCallback, useMemo } from "react"
import { useTranslations } from "next-intl"
import { IUserRoutes } from "@/interfaces"
import { AutoStories, AutoStoriesOutlined, ClassOutlined } from "@mui/icons-material"

interface QuickLinksProps {
  userRoutes?: IUserRoutes
}

export function QuickLinks({ userRoutes }: QuickLinksProps) {
  const pathname = usePathname()
  const isLanding = useMemo(() => pathname === '/', [pathname])
  const tLanding = useTranslations('components.landing')
  const tLinks = useTranslations('components.sidebar')

  const scrollToSection = useCallback((id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({behavior: 'smooth'})
    }
  }, [])

  const links = useMemo(() => {
    return userRoutes ? [
      {link: 'manuals', Icon: AutoStoriesOutlined, label: tLinks('manuals')},
      {link: userRoutes?.diaryLink, Icon: ClassOutlined, label: tLinks('diary')},
      {link: userRoutes?.journalLink, Icon: AutoStories, label: tLinks('journal')},
    ] : []
  }, [userRoutes, tLinks])

  return <>
    {isLanding ? ['student', 'teacher', 'parent'].map(type => <Button
      key={type}
      onClick={() => scrollToSection(`${type}_pluses`)}
    >
      <Typography variant='h6'>{tLanding(`for.${type}`)}</Typography>
    </Button>) : links.map((link, i) => <Link key={i} href={`/core/${link.link}`}>
      <Button sx={{gap: 1}}>
        {<link.Icon color='primary' sx={{display: {xs: 'none', xl: 'block'}}} />}
        <Typography variant='h6'>{link.label}</Typography>
      </Button>
    </Link>)}
  </>
}