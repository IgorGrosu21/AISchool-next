'use client'

import { Card } from "@/ui"
import { IPersonHome } from "@/interfaces"
import { Stack, Typography } from "@mui/material"
import { Link } from "@/i18n"
import { LineChart } from "./lineChart"

interface AnalyticsProps {
  id: string
  analytics: (IPersonHome & { profileType: 'student' })['analytics']
}

export function Analytics({id, analytics}: AnalyticsProps) {
  return <Stack gap={4} sx={{width: '100%'}}>
    {analytics.filter(a => a.points.length > 0).map((analytic, index) => <Card key={index} index={index}>
      <Link href={`/core/journal/students/${id}`}>
        <Stack gap={2} sx={{width: '100%'}}>
          <Typography variant="h6" color='primary' sx={{textAlign: 'center'}}>
            {analytic.subject.verboseName}
          </Typography>
          <LineChart data={analytic.points} />
        </Stack>
      </Link>
    </Card>)}
  </Stack>
}