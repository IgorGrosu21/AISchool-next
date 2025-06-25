import { GradeGroup, NavigationContainer } from "@/components";
import { fetchSubjects } from "@/utils/api";
import { Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const subjects = await fetchSubjects()
  const t = await getTranslations('subjects');

  return <NavigationContainer segments={[]} last={t('plural')}>
    <Typography variant='h4'>{t('plural')}</Typography>
    <GradeGroup collection={subjects} circleSize={164} renderItem={item => <Link href={`/core/subjects/${item.slug}`}>
      <Stack gap={2} sx={{alignItems: 'center'}}>
        <Stack sx={{p: 0.5, bgcolor: 'primary.main', borderRadius: '50%', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            src={item.name.image}
            alt={item.name.verboseName}
            width={150}
            height={150}
            style={{backgroundColor: '#fff', padding: 8, borderRadius: '50%'}}
            loading="lazy"
          />
        </Stack>
        <Typography variant='h5' sx={{textAlign: 'center'}}>{item.name.verboseName}</Typography>
      </Stack>
    </Link>} />
  </NavigationContainer>
}