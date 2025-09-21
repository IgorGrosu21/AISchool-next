import { Contacts, Photos, KlassesButton, NavigationContainer, SchoolPositions, TimetableButton, Title } from '@/components';
import { errorHandler, fetchSchool } from '@/utils/api';
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
    <Stack direction='column' gap={4}>
      <Stack sx={{position: 'relative', width: '100%', overflow: 'hidden'}}>
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
        <Stack sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography variant='h5' sx={{
            color: 'primary.contrastText',
            textAlign: 'center',
            px: 3,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          }}>
            {school.desc}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
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