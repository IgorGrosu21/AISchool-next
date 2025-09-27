'use server'

import { IconButton, Stack, Typography } from "@mui/material";
import { isLoggedIn } from "@/app/actions";
import { Link } from '@/i18n';
import { Login } from "@mui/icons-material"
import { SideBarWrapper } from "./sidebarWrapper";
import { LanguagePicker } from "./languagePicker";
import { ToTopButton } from "./toTopButton";
import { NightNodeToggler } from "./nightNodeToggler";
import { ThemeImage } from "../themeImage";
import { QuickLinks } from "./quickLinks";
import { errorHandler, fetchUserRoutes } from "@/requests";
import { IUserRoutes } from "@/interfaces";

export async function Header() {
  const loggedIn = await isLoggedIn()
  let userRoutes: IUserRoutes | undefined = undefined
  if (loggedIn) {
    const [userRoutesRaw, status] = await fetchUserRoutes()
    userRoutes = await errorHandler(userRoutesRaw, status)
  }

  return <Stack direction='row' component='header' sx={{
    position: 'sticky',
    zIndex: 1300,
    top: 0,
    py: 2,
    px: { xs: 2, sm: 4, md: 8, lg: 16 },
    bgcolor: {xs: 'rgba(233, 242, 247, 0.8)', md: 'background.paper'},
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  }}>
    <Stack gap={{xs: 2, lg: 4}} direction='row' sx={{flex: {xs: 0, lg: 1}, alignItems: 'center', justifyContent: 'flex-start'}}>
      <Link href='/core'>
        <ThemeImage srcDark='/images/logo-hat-dark.png' srcLight='/images/logo-hat-light.png' alt='logo' width={97.5} height={70} />
      </Link>
      <Link href='tel:+37360578524'>
        <Stack direction='row' gap={1} sx={{alignItems: 'center', display: {xs: 'none', md: 'flex'}}}>
          <Typography variant='h6' color='primary' sx={{fontSize: '1.25rem'}}>
            +373
          </Typography>
          <Typography variant='h5' color='primary' sx={{fontSize: {xs: '1.25rem', lg: '1.5rem'}}}>
            60 578 524
          </Typography>
        </Stack>
      </Link>
    </Stack>
    <Stack gap={{md: 2, lg: 4}} direction='row' sx={{flex: 1, alignItems: 'center', justifyContent: 'center', display: {xs: 'none', md: 'flex'}}}>
      <QuickLinks userRoutes={userRoutes} />
    </Stack>
    <Stack gap={{xs: 2, lg: 4}} direction='row' sx={{flex: {xs: 1, md: 0, lg: 1}, alignItems: 'center', justifyContent: 'flex-end'}}>
      <NightNodeToggler />
      <LanguagePicker />
      {loggedIn ? <SideBarWrapper userRoutes={userRoutes!} /> : <Link href='/auth'>
        <IconButton size="large" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
          <Login />
        </IconButton>
      </Link>}
    </Stack>
    <ToTopButton />
  </Stack>
}