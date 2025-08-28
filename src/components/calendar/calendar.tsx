'use client'

import { Divider, Grid2, Stack } from '@mui/material'
import { Month } from './month'
import { AnimatePresence, motion } from 'framer-motion'
import { MonthButton } from './monthButton'
import { useCalendarContext } from '@/providers'

export function Calendar() {
  const { monthGroups, activeMonth, setActiveMonth, setActiveDay } = useCalendarContext()

  return <AnimatePresence mode='wait'>
    {activeMonth !== undefined ? <motion.div
      layout
      layoutRoot
      key='zoomed-month'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <Month month={activeMonth} />
      <Divider sx={{my: 8}} />
      <Stack direction='row' sx={{justifyContent: 'space-between'}}>
        {monthGroups.map(group => group.map(month => <MonthButton
          key={month.getMonth()}
          activeMonth={activeMonth}
          month={month}
          onClick={month === activeMonth ? () => {} : () => {
            //this can be clicked both from month and week section, so we set the active day to undefined, just for sure
            setActiveMonth(month)
            setActiveDay(undefined)
          }}
        />))}
      </Stack>
    </motion.div> : <motion.div layout key='year-view'>
      <Grid2 container columns={3} spacing={8}>
        {monthGroups.map(group => group.map(month => <Grid2 key={month.getMonth()} size={1}>
          <Month month={month} />
        </Grid2>))}
      </Grid2>
    </motion.div>}
  </AnimatePresence>
}