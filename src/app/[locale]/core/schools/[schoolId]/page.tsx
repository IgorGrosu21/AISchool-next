import { EditButton, KlassesButton, NavigationContainer, SchoolPositions, TimetableButton } from '@/components';
import { fetchSchool } from '@/utils/api';
import { Stack, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Contacts } from './contacts';
import { Photos } from './photos';

export default async function Page({ params }: { params: Promise<{schoolId: string}> }) {
  const { schoolId } = await params;
  const school = await fetchSchool(schoolId)
  const t = await getTranslations('schools');
  
  return <NavigationContainer segments={[{label: t('list'), href: 'schools'}]} last={school.name}>
    <Stack direction='row' sx={{justifyContent: 'flex-end', alignItems: 'center'}}>
      <EditButton link={`/core/schools/${schoolId}`} editable={school} />
    </Stack>
    <Stack direction='row' gap={4}>
      <Stack sx={{flex: 1}}>
        <Image
          width={1792}
          height={1024}
          src={school.preview ?? '/images/default-school.png'}
          alt='school-preview'
          style={{width: '100%', height: 'auto'}}
          priority
        />
      </Stack>
      <Stack gap={2} sx={{flex: 1}}>
        <Typography variant='h5'>{school.name}</Typography>
        <Typography variant='h6'>{school.desc}</Typography>
      </Stack>
    </Stack>
    <Contacts school={school} />
    <SchoolPositions school={school} />
    <Stack sx={{alignItems: 'center'}}>
      <KlassesButton schoolId={schoolId} />
    </Stack>
    <Stack sx={{alignItems: 'center'}}>
      <TimetableButton schoolId={schoolId} />
    </Stack>
    <Photos school={school} />
  </NavigationContainer>
}