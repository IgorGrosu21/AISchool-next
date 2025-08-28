import { Stack, Typography } from "@mui/material"
import Link from "next/link"
import Image from 'next/image';
import { fetchStudent } from "@/utils/api";
import { Balance, KlassLink, Profile } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const student = await fetchStudent(id)
  
  const klass = student.klass
  const school = klass?.school

  return <Profile user={student.user} headerChildren={student.balance && <Balance balance={student.balance} />}>
    {klass && <KlassLink klass={klass} />}
    <Stack>
      <Link href={`/core/schools/${school?.slug}/`} style={{flex: 1, height: '100%'}}>
        <Stack gap={4} sx={{justifyContent: 'space-between', height: '100%'}}>
          <Typography variant='h5' sx={{textAlign: 'center', color: 'primary.main'}}>{school?.name}</Typography>
          <Image
            width={1792}
            height={1024}
            src={school?.preview ?? '/images/default-school.png'}
            alt='school-image'
            style={{width: '100%', height: 'auto'}}
            priority
          />
        </Stack>
      </Link>
    </Stack>
  </Profile>
}