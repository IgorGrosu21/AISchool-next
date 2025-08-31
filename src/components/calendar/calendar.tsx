'use client'

import { Divider, Grid2 } from '@mui/material'
import { Month } from './month'
import { AnimatePresence, motion } from 'framer-motion'
import { MonthButton } from './monthButton'
import { useCalendarContext } from '@/providers'
import { useIsMobile } from '@/hooks'

export function Calendar() {
  const { monthGroups, activeMonth, setActiveMonth, setActiveDay } = useCalendarContext()
  const isMobile = useIsMobile()

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
      <Grid2 container columns={isMobile ? 3 : 9} spacing={isMobile ? 2 : 8}>
        {monthGroups.map(group => group.map(month => <Grid2 key={month.getMonth()} size={1}>
          <MonthButton
            key={month.getMonth()}
            activeMonth={activeMonth}
            month={month}
            onClick={month === activeMonth ? () => {} : () => {
              //this can be clicked both from month and week section, so we set the active day to undefined, just for sure
              setActiveMonth(month)
              setActiveDay(undefined)
            }}
          />
        </Grid2>))}
      </Grid2>
    </motion.div> : <motion.div layout key='year-view'>
      <Grid2 container columns={isMobile ? 1 : 3} spacing={isMobile ? 2 : 8}>
        {monthGroups.map(group => group.map(month => <Grid2 key={month.getMonth()} size={1}>
          <Month month={month} />
        </Grid2>))}
      </Grid2>
    </motion.div>}
  </AnimatePresence>
}