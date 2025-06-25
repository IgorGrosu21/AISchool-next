'use client'

import { IKlassWithDiary } from '@/utils/interfaces';
import { Grid2 } from '@mui/material';
import { addDays, startOfWeek } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import { Days } from './days';
import { Week } from './week';
import { useCalendarContext } from '@/providers';

interface WeeksProps {
  klass?: IKlassWithDiary //as we pass the klass only to active month, some weeks will get undefined
  calendarDays: Array<Date | null>
}

export function Weeks({klass, calendarDays}: WeeksProps) {
  const { activeDay } = useCalendarContext()

  //we want to highlight current week, so we need to split days into weeks
  const weeks = useMemo(() => {
    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks
  }, [calendarDays])

  const activeWeek = useMemo(() => {
    if (activeDay) {
      const start = startOfWeek(activeDay, { weekStartsOn: 1 });
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
  }, [activeDay])

  return <AnimatePresence mode='wait'>
    {activeWeek ? <motion.div
      layout
      layoutRoot
      key='zoomed-week'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4 }}
    >
      {/*as mentioned, unactive weeks have klass as undefined*/}
      {klass && <Week klass={klass} dates={activeWeek} />}
    </motion.div> : <motion.div layout key='month-view'>
      <Grid2 container spacing={2} columns={7}>
        {weeks.map((week, i) => <Days key={i} week={week} />)}
      </Grid2>
    </motion.div>}
  </AnimatePresence>
}