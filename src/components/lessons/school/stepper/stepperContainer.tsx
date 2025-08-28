'use client'

import { Stack, Step, StepButton, Stepper } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

interface TimetableStepperContainerProps {
  subjectsComponent: React.ReactNode
  lessonTimeComponent: React.ReactNode
  groupComponent: React.ReactNode
  lessonsComponent: React.ReactNode
}

export function TimetableStepperContainer({subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent}: TimetableStepperContainerProps) {
  const t = useTranslations('timetable')
  const [activeStep, setActiveStep] = useState(3)
  const steps = useMemo(() => [
    {label: t('subjects.plural'), component: subjectsComponent},
    {label: t('lesson_time.singular'), component: lessonTimeComponent},
    {label: t('group.plural'), component: groupComponent},
    {label: t('singular'), component: lessonsComponent}
  ], [subjectsComponent, lessonTimeComponent, groupComponent, lessonsComponent, t])

  return <Stack gap={8}>
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((step, i) => <Step key={i} completed={activeStep > i}>
        <StepButton color="inherit" onClick={() => setActiveStep(i)}>
          {step.label}
        </StepButton>
      </Step>)}
    </Stepper>
    {steps[activeStep].component}
  </Stack>
}