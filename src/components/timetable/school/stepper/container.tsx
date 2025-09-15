'use client'

import { Button, Stack } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'

interface TimetableStepperContainerProps {
  subjectsComponent: React.ReactNode
  lessonTimeComponent: React.ReactNode
  groupComponent: React.ReactNode
  lessonsComponent: React.ReactNode
}

export function TimetableStepperContainer({subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent}: TimetableStepperContainerProps) {
  const t = useTranslations('timetable')
  const [activeStep, setActiveStep] = useState(1)
  const steps = useMemo(() => [
    {label: t('subjects.plural'), component: subjectsComponent},
    {label: t('lesson_time.singular'), component: lessonTimeComponent},
    {label: t('group.plural'), component: groupComponent},
    {label: t('singular'), component: lessonsComponent}
  ], [subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent, t])

  return <Stack gap={8}>
    <Stack direction='row' gap={2} sx={{justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
      {steps.map((step, i) => <Button
        key={i}
        variant={activeStep === i ? 'contained' : 'outlined'}
        onClick={() => setActiveStep(i)}
      >
        {step.label}
      </Button>)}
    </Stack>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {steps[activeStep].component}
      </motion.div>
    </AnimatePresence>
  </Stack>
}