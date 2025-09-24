'use client'

import { IKlassNameWithGroups } from "@/interfaces"
import { Box, Divider, Stack } from "@mui/material"
import { useMemo } from "react"
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n';
import { GroupsContainer } from "./container";

interface GroupsProps {
  klass: IKlassNameWithGroups
}

export function Groups({klass}: GroupsProps) {
  const groups = useMemo(() => klass.groups, [klass])
  const subjects = useMemo(() => groups.filter(g => g.order === 1).map(g => g.subject), [groups])

  return <GroupsContainer klass={klass} subjects={subjects} render={group => <>
    <Stack direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
      <Typography variant='h5'>
        #{group.order}
      </Typography>
      <Link href={`/core/profile/teachers/${group.teacher?.id}`}>
        <Typography color='primary' variant='h5'>
          {group.teacher?.user.surname ?? ''} {group.teacher?.user.name ?? ''}
        </Typography>
      </Link>
      <Box />
    </Stack>
    <Divider />
    <Stack gap={1} sx={{my: 4}}>
      {group.students.map((student, k) => <Stack key={k} direction='row' gap={2} sx={{justifyContent: 'space-between'}}>
        <Typography variant='h6'>
          #{k + 1}
        </Typography>
        <Link key={k} href={`/core/profile/students/${student.id}`}>
          <Typography color='primary' variant='h6'>
            {student.user.surname} {student.user.name}
          </Typography>
        </Link>
        <Box />
      </Stack>)}
    </Stack>
  </>} />
}