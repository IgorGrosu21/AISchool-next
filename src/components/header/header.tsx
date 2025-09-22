'use server'

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { isLoggedIn } from "@/app/actions/token";
import Image from "next/image";
import { Link } from '@/i18n';
import { Login } from "@mui/icons-material"
import { SideBarWrapper } from "./sidebarWrapper";
import { LanguagePicker } from "./languagePicker";
import { ToTopButton } from "./toTopButton";

export async function Header() {
  const loggedIn = await isLoggedIn()
  
  return <Stack gap={{xs: 2, md: 4}} direction='row' component='header' sx={{
    position: 'sticky',
    zIndex: 1300,
    top: 0,
    py: 2,
    px: { xs: 2, sm: 4, md: 8, lg: 16 },
    bgcolor: {xs: 'rgba(233, 242, 247, 0.8)', md: 'background.paper'},
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  }}>
    <Link href='/'>
      <Image priority src='/images/logo-blue-hat.png' alt='logo' width={97.5} height={70} />
    </Link>
    <Box sx={{flex: 1}} />
    <Link href='tel:+37360578524'>
      <Stack direction='row' gap={1} sx={{alignItems: 'center', display: {xs: 'none', md: 'flex'}}}>
        <Typography variant='h6' color='primary'>
          +373
        </Typography>
        <Typography variant='h5' color='primary'>
          60 578 524
        </Typography>
      </Stack>
    </Link>
    <LanguagePicker />
    {loggedIn ? <SideBarWrapper /> : <Link href='/auth'>
      <IconButton size="large" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
        <Login />
      </IconButton>
    </Link>}
    <ToTopButton />
  </Stack>
}