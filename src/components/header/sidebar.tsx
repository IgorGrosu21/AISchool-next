'use client'

import { Link } from '@/i18n'
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "@/i18n"

import { Menu, Close} from "@mui/icons-material"
import { Stack, Typography, IconButton, Drawer } from "@mui/material"
import { useTranslations } from "next-intl"
import { AuthButton, ThemeImage } from "@/components"
import { logoutThis, verify } from "@/app/actions"
import { RouteController } from "./routeController"
import { IUserRoutes } from "@/interfaces"

type Routes = Array<Array<{
  path: string,
  label?: string,
  icon: React.ReactNode
}>>

interface SideBarProps {
  user: IUserRoutes
  routes: Routes
}

export function SideBar({ user, routes }: SideBarProps) {
  const [opened, open] = useState(false)
  const pathname = usePathname()
  const t = useTranslations('components.sidebar')

  const toggleDrawer = useCallback(() => {
    open(opened => !opened)
  }, [])
  
  useEffect(() => {
    open(false)
  }, [pathname])

  return <>
    <IconButton onClick={toggleDrawer} size="large" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
      <Menu />
    </IconButton>
    <Drawer
      variant="temporary"
      open={opened}
      onClose={toggleDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 1300,
        '& .MuiBackdrop-root': {
          bgcolor: 'transparent'
        }
      }}
    >
      <Stack sx={{
        height: '100vh',
        minWidth: {xs: '100vw', md: '25vw', lg: '17.5vw'},
        maxWidth: {xs: '100vw', md: '33vw', lg: '20vw'},
        width: {xs: '100vw', md: 'auto'},
        bgcolor: 'background.default',
        transition: '0.5s'
      }}>
        <Stack direction='row' sx={{p: 2, justifyContent: 'center', bgcolor: 'primary.dark', position: 'relative'}}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              display: {xs: 'block', md: 'none'},
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'primary.contrastText'
            }}
          >
            <Close />
          </IconButton>
          <ThemeImage
            srcDark='/images/logo-transparent-dark.png'
            srcLight='/images/logo-transparent-light.png'
            alt='logo'
            width={100}
            height={94}
          />
        </Stack>
        <Stack sx={{height: '100%', width: '100%', justifyContent: 'center'}}>
          <Stack gap={2} direction='row' sx={{p: 2, bgcolor: 'primary.main', alignItems: 'center'}}>
            <Link href={user.profileLink ?? '/core'} style={{display: 'flex', alignItems: 'center', pointerEvents: user.profileLink ? 'unset' : 'none'}}>
              <ThemeImage
                srcDark={user.avatar ? user.avatar : '/images/default-avatar-dark.png'}
                srcLight={user.avatar ? user.avatar : '/images/default-avatar-light.png'}
                style={{borderRadius: '50%'}}
                alt='avatar'
                width={100}
                height={100}
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
                <Link key={j} href={'/core/' + route.path}>
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
        </Stack>
      </Stack>
    </Drawer>
  </>
}