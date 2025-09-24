'use client'

import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Stack, Typography } from "@mui/material"
import { Link } from "@/i18n"
import { BarChart } from "./barChart"

interface AnalyticsProps {
  id: string
  analytics: (IPersonHome & { profileType: 'teacher' })['analytics']
}

export function Analytics({id, analytics}: AnalyticsProps) {
  return <Stack gap={4} sx={{width: '100%'}}>
    {analytics.map((analytic, i) => <Stack gap={4} key={i}>
      <Typography variant='h5' color='primary'>{analytic.school.name}</Typography>
      {analytic.subjects.map((subject, j) => <Card key={j} index={j}>
        <Link href={`/core/journal/teachers/${id}`}>
          <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
            {subject.subjectName.verboseName}
          </Typography>
          <BarChart data={subject.klasses} />
        </Link>
      </Card>)}
    </Stack>)}
  </Stack>
}