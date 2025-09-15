'use client'

import { SpecificLessons } from '@/components';
import { useWeekView } from '@/hooks';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';

interface WeekProps {
  dates: Date[]
}

export function Week({dates}: WeekProps) {
  const { specificLessons, isPending, isCurrent, canSubDays, canAddDays, goToPrevWeek, goToNextWeek } = useWeekView(dates)

  return <Stack gap={2} sx={{alignItems: 'center'}}>
    <Stack direction='row' sx={{alignItems: 'center'}}>
      <Button color='primary' onClick={goToPrevWeek} disabled={!canSubDays}>
        <ChevronLeft />
      </Button>
      <Stack direction='row' gap={2} sx={{
        color: isCurrent ? 'secondary.main' : 'primary.main',
        alignItems: 'center',
        transition: '1s'
      }}>
        <Typography variant='h6'>{format(dates[0], 'd.M')}</Typography>
        <Typography variant='h6'>-</Typography>
        <Typography variant='h6'>{format(dates[dates.length - 1], 'd.M')}</Typography>
      </Stack>
      <Button color='primary' onClick={goToNextWeek} disabled={!canAddDays}>
        <ChevronRight />
      </Button>
    </Stack>
    <Box sx={{position: 'relative'}}>
      <Box sx={{opacity: isPending ? 0.2 : 1, transition: '0.35s'}}>
        <SpecificLessons specificLessons={specificLessons} dates={dates} />
      </Box>
      <Stack direction='row' sx={{
        position: 'absolute',
        top: 0,
        width: '100%',
        pt: 8,
        justifyContent: 'center',
        opacity: isPending ? 1 : 0,
        transition: '0.35s'
      }}>
        {isPending && <CircularProgress size='30vh' />}
      </Stack>
    </Box>
  </Stack>
}