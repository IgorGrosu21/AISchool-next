'use server'

import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";

export async function Ad({children}: {children: ReactNode | ReactNode[]}) {
  const cookieStore = await cookies()
  const hasSubcription = cookieStore.get('subscription')?.value
  const t = await getTranslations('components.ad');

  if (hasSubcription === '1') {
    return children
  }

  return <Stack gap={4} sx={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
    <Typography variant='h4' textAlign='center'>{t('title')}</Typography>
    <Typography variant='h5' textAlign='center'>{t('promo')}</Typography>
    <Typography textAlign='center'>{t('info')}</Typography>
    <Link href='/core/subscriptions'>
      <Stack direction='row' sx={{width: '100%', justifyContent: 'center'}}>
        <Button variant='contained'>
          <Typography>{t('redirect')}</Typography>
        </Button>
      </Stack>
    </Link>
  </Stack>
}