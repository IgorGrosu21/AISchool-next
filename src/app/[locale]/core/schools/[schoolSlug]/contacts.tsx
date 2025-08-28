import { IDetailedSchool } from "@/utils/interfaces";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface ContactsProps {
  school: IDetailedSchool
}

export async function Contacts({school}: ContactsProps) {
  const t = await getTranslations('schools.details');
  
  return <Stack gap={2}>
    <Typography variant='h5' sx={{textAlign: 'center'}}>{t('contacts')}</Typography>
    <Stack direction='row' gap={1}>
      <Typography variant='h6'>{t('phones')}:</Typography>
      <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
        {school.phones.split(' / ').map((phone, i) => <Link key={i} href={`tel:${phone}`}>
          <Typography variant='h6' color='primary'>{phone}</Typography>
        </Link>)}
      </Stack>
    </Stack>
    <Stack direction='row' gap={1}>
      <Typography variant='h6'>{t('emails')}:</Typography>
      <Stack direction='row' gap={2} sx={{alignItems: 'center', flexWrap: 'wrap'}}>
        {school.emails.split(' / ').map((email, i) => <Link key={i} href={`mailto:${email}`}>
          <Typography variant='h6' color='primary'>{email}</Typography>
        </Link>)}
      </Stack>
    </Stack>
    <Typography variant='h6'>{t('address')}: {school.city.name}, {school.address}</Typography>
    <Stack direction='row' gap={1}>
      <Typography variant='h6'>{t('emails')}:</Typography>
      <Link href={school.website} target='_blank'>
        <Typography variant='h6' color='primary'>{school.website}</Typography>
      </Link>
    </Stack>
    <Typography variant='h6'>{t('work_hours')}: {school.workHours}</Typography>
  </Stack>
}