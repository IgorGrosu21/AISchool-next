'use client'

import { IKlassNameWithGroups } from "@/utils/interfaces"
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack } from "@mui/material"
import { ArrowForwardIosSharp } from '@mui/icons-material';
import { useMemo, useState } from "react"
import Typography from '@mui/material/Typography';
import Link from "next/link";

interface GroupsProps {
  klass: IKlassNameWithGroups
}

export function Groups({klass}: GroupsProps) {
  const groups = useMemo(() => klass.groups, [klass])
  const subjects = useMemo(() => groups.filter(g => g.order === 1).map(g => g.subject), [groups])
  const [active, setActive] = useState(-1)

  return <Stack>
    {subjects.map((subject, i) => {
      const subjectGroups = groups.filter(g => g.subject.id === subject.id)
      return <Accordion key={i} expanded={active === i} onChange={() => setActive(active === i ? -1 : i)}>
        <AccordionSummary expandIcon={<ArrowForwardIosSharp sx={{ fontSize: '0.9rem' }} />}>
          <Typography component="span">{subject.verboseName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction='row' gap={4}>
            {subjectGroups.map((group, j) => <Stack key={j} sx={{flex: 1}} gap={2}>
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
            </Stack>)}
          </Stack>
        </AccordionDetails>
      </Accordion>
    })}
  </Stack>
}