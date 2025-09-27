'use server'

import { Panel } from "@/ui";
import { IDetailedSchool } from "@/interfaces";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n';

interface ContactsProps {
  school: IDetailedSchool
}

export async function Contacts({school}: ContactsProps) {
  const t = await getTranslations('schools.details');
  
  return <Stack gap={2}>
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>{t('contacts')}</Typography>
    </Panel>
    <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
      <Typography variant='h6'>{t('phones')}:</Typography>
      <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
        {school.phones.split(' / ').map((phone, i) => <Link key={i} href={`tel:${phone}`}>
          <Typography variant='h6' color='primary'>{phone}</Typography>
        </Link>)}
      </Stack>
    </Panel>
    <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
      <Typography variant='h6'>{t('emails')}:</Typography>
      <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
        {school.emails.split(' / ').map((email, i) => <Link key={i} href={`mailto:${email}`}>
          <Typography variant='h6' color='primary'>{email}</Typography>
        </Link>)}
      </Stack>
    </Panel>
    <Panel>
      <Typography variant='h6'>{t('address')}: {school.city.name}, {school.address}</Typography>
    </Panel>
    <Panel direction={{xs: 'column', md: 'row'}} gap={1}>
      <Typography variant='h6'>{t('emails')}:</Typography>
      <Link href={school.website} target='_blank'>
        <Typography variant='h6' color='primary'>{school.website}</Typography>
      </Link>
    </Panel>
    <Panel>
      <Typography variant='h6'>{t('work_hours')}: {school.workHours}</Typography>
    </Panel>
  </Stack>
}