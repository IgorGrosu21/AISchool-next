'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import { Menu, Close} from "@mui/icons-material"
import { Stack, Typography, IconButton, Drawer } from "@mui/material"
import { useTranslations } from "next-intl"
import { AuthButton } from "@/components"
import { logoutThis, verify } from "@/app/actions/auth"
import { RouteController } from "./routeController"
import { IUserRoutes } from "@/utils/interfaces/detailed/user"
import { useIsMobile } from "@/hooks"

type Routes = Array<Array<{
  path: string,
  label?: string,
  icon: React.ReactNode
}>>

interface SideBarProps {
  user?: IUserRoutes
  routes: Routes
}

export function SideBar({ user, routes }: SideBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const t = useTranslations('components.sidebar')

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }
  
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }, [pathname, isMobile])

  if (!isClient) {
    return null
  }

  const sidebarContent = <Stack sx={{height: '100vh', minWidth: '15vw', width: isMobile ? '100vw' : 'auto', maxWidth: isMobile ? '100vw' : '17.5vw'}}>
    <Stack sx={{
      position: isMobile ? 'relative' : 'fixed',
      top: 0,
      left: 0,
      minWidth: '15vw',
      width: isMobile ? '100vw' : 'auto',
      maxWidth: isMobile ? '100vw' : '17.5vw',
      height: '100%',
      bgcolor: 'background.default'
    }}>
      <Stack direction='row' sx={{p: 2, justifyContent: 'center', bgcolor: 'primary.dark', position: 'relative'}}>
        {isMobile && <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white'
          }}
        >
          <Close />
        </IconButton>}
        <Image src='/images/logo-white.png' width={100} height={94} alt='light-logo' priority />
      </Stack>
      {user ? <Stack sx={{height: '100%', width: '100%', justifyContent: 'center'}}>
        <Stack gap={2} direction='row' sx={{p: 2, bgcolor: 'primary.main', alignItems: 'center'}}>
          <Link href={user.profileLink ?? '/core'} style={{display: 'flex', alignItems: 'center', pointerEvents: user.profileLink ? 'unset' : 'none'}}>
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
        {user.isAccountVerified ? <Stack gap={2} sx={{p: 4}}>
          {routes.map((group, i) => <Stack key={i}>
            {group.map((route, j) => (
              <Link key={j} href={'/core/' + route.path} onClick={handleLinkClick}>
                <Stack direction='row' gap={1} sx={{ 
                  p: 1, 
                  borderRadius: 1, 
                  '&:hover': { bgcolor: 'action.hover' },
                  transition: 'background-color 0.2s'
                }}>
                  {route.icon}
                  <Typography>{route.label ?? t(route.path)}</Typography>
                </Stack>
              </Link>
            ))}
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
      </Stack> : <Link href='/auth' onClick={handleLinkClick}>
        <Stack sx={{p: 4}}>
          <AuthButton type='login' variant='h6' />
        </Stack>
      </Link>}
    </Stack>
  </Stack>

  if (isMobile) {
    return <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1200,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Menu />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {sidebarContent}
      </Drawer>
    </>
  }

  return sidebarContent
}