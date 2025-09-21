'use client'

import { Home, ArrowBack } from "@mui/icons-material";
import { Stack, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n';
import { useRouter } from "@/i18n"

export function ErrorButtons() {
  const t = useTranslations('errors')
  const router = useRouter()
  
  return <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
    <Button variant="contained" size="large" startIcon={<Home />} component={Link} href="/core">
      {t('home')}
    </Button>
    <Button variant="outlined" size="large" startIcon={<ArrowBack />} onClick={() => router.back()} >
      {t('back')}
    </Button>
  </Stack>
}