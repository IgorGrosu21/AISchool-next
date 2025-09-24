'use client'

import Image from "next/image"
import { Link } from '@/i18n'
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "@/i18n"

import { Menu, Close} from "@mui/icons-material"
import { Stack, Typography, IconButton, Drawer } from "@mui/material"
import { useTranslations } from "next-intl"
import { AuthButton } from "@/components"
import { logoutThis, verify } from "@/app/actions"
import { RouteController } from "./routeController"
import { IUserRoutes } from "@/interfaces/detailed/user"

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
        minWidth: {xs: '100vw', lg: '17.5vw'},
        maxWidth: {xs: '100vw', lg: '20vw'},
        width: {xs: '100vw', lg: 'auto'},
        bgcolor: 'background.default'
      }}>
        <Stack direction='row' sx={{p: 2, justifyContent: 'center', bgcolor: 'primary.dark', position: 'relative'}}>
          <IconButton
            onClick={toggleDrawer}
            sx={{
              display: {xs: 'block', lg: 'none'},
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'primary.contrastText'
            }}
          >
            <Close />
          </IconButton>
          <Image src='/images/logo-white.png' width={100} height={94} alt='light-logo' priority />
        </Stack>
        <Stack sx={{height: '100%', width: '100%', justifyContent: 'center'}}>
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