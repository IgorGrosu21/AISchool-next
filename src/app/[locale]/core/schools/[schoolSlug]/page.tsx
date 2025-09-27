import { Contacts, Photos, KlassesButton, NavigationContainer, SchoolPositions, TimetableButton, Title } from '@/components';
import { errorHandler, fetchSchool } from '@/requests';
import { Panel } from '@/ui';
import { Stack, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;

  const [schoolRaw, status] = await fetchSchool(schoolSlug)
  const school = await errorHandler(schoolRaw, status)
  const t = await getTranslations('schools');
  
  return <NavigationContainer segments={[{label: t('list'), href: 'schools'}]} last={school.name}>
    <Title label={school.name} link={`/core/schools/${schoolSlug}`} editable={school} />
    <Image
      width={1792}
      height={1024}
      src={school.preview ?? '/images/default-school.png'}
      alt='school-preview'
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
      priority
    />
    <Panel>
      <Typography variant='h5' sx={{textAlign: 'center'}}>
        {school.desc}
      </Typography>
    </Panel>
    <Contacts school={school} />
    <Stack sx={{alignItems: 'center'}}>
      <KlassesButton schoolSlug={schoolSlug} />
    </Stack>
    <Stack sx={{alignItems: 'center'}}>
      <TimetableButton schoolSlug={schoolSlug} />
    </Stack>
    <SchoolPositions school={school} />
    <Photos school={school} />
  </NavigationContainer>
}