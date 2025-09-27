'use server'

import { Facebook, Instagram } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { ThemeImage } from "./themeImage"
import { Link } from '@/i18n'
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations('components.footer');

  return <Stack gap={{xs: 4, md: 8, lg: 16}} direction={{xs: 'column', md: 'row'}} component='footer' sx={{
    py: 4,
    px: { xs: 2, sm: 4, md: 8, lg: 16 },
    bgcolor: 'background.paper',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    alignItems: {xs: 'center', md: 'flex-start'},
  }}>
    <Box sx={{display: {xs: 'none', md: 'block'}}}>
      <Link href='/'>
        <ThemeImage srcDark='/images/logo-blue-dark.png' srcLight='/images/logo-blue-light.png' alt='logo' width={100} height={94} />
      </Link>
    </Box>
    <Stack gap={2}>
      <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
        {t('info')}
      </Typography>
      <Stack gap={1}>
        <Link href='/about'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('about')}
          </Typography>
        </Link>
        <Link href='/news'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('news')}
          </Typography>
        </Link>
        <Link href='/help/privacy_policy'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('privacy_policy')}
          </Typography>
        </Link>
      </Stack>
    </Stack>
    <Stack gap={2}>
      <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
        {t('support')}
      </Typography>
      <Stack gap={1}>
        <Link href='/help/user_agreement'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('user_agreement')}
          </Typography>
        </Link>
        <Link href='/help/faq'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            {t('help')}
          </Typography>
        </Link>
      </Stack>
    </Stack>
    <Stack gap={2}>
      <Typography color='primary' variant='h6' sx={{textAlign: {xs: 'center', md: 'start'}}}>
        {t('contacts')}
      </Typography>
      <Stack gap={1}>
        <Link href='tel:+37360578524' target='_blank'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            +373 60 578 524
          </Typography>
        </Link>
        <Link href='mailto:aischool.md@gmail.com' target='_blank'>
          <Typography color='textSecondary' sx={{textAlign: {xs: 'center', md: 'start'}}}>
            aischool.md@gmail.com
          </Typography>
        </Link>
        <Stack direction='row' gap={1} sx={{justifyContent: {xs: 'center', md: 'flex-start'}}}>
          <Facebook color='primary' fontSize='large' />
          <Instagram color='primary' fontSize='large' />
        </Stack>
      </Stack>
    </Stack>
  </Stack>
}