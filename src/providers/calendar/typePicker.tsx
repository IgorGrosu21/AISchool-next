'use client'

import { ViewCompact, Apps, ViewWeek } from "@mui/icons-material"
import { Stack, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { setDate } from "date-fns"
import { Dispatch, SetStateAction, useCallback } from "react"

interface TypePickerProps {
  type: 'year' | 'month' | 'week'
  setType: Dispatch<SetStateAction<'year' | 'month' | 'week'>>
  currentMonth: Date
  setActiveMonth: Dispatch<SetStateAction<Date | undefined>>
  currentDay: Date
  setActiveDay: Dispatch<SetStateAction<Date | undefined>>
}

export function TypePicker({type, setType, currentMonth, setActiveMonth, currentDay, setActiveDay}: TypePickerProps) {
  const updateType = useCallback((type: 'year' | 'month' | 'week' | null) => {
    if (type === null) {
      return //either state should be choosen
    }
    setType(type)
    switch (type) {
      case 'year': {
        setActiveMonth(undefined)
        setActiveDay(undefined)
        break
      }
      case 'month': {
        setActiveMonth(m => m ?? currentMonth) //if active month is undefined, set the current month
        setActiveDay(undefined)
        break
      }
      case 'week': {
         //if active day is undefined, set the current day and month
        setActiveDay(d => {
          setActiveMonth(setDate((d ?? currentDay), 1))
          return d ?? currentDay
        })
        break
      }
    }
  }, [currentDay, currentMonth, setActiveDay, setActiveMonth, setType])

  return <Stack direction='row' sx={{justifyContent: 'flex-end'}}>
    <ToggleButtonGroup
      color='primary'
      value={type}
      exclusive
      onChange={(_, v) => updateType(v)}
    >
      <ToggleButton value='year'>
        <ViewCompact />
      </ToggleButton>
      <ToggleButton value='month'>
        <Apps />
      </ToggleButton>
      <ToggleButton value='week'>
        <ViewWeek />
      </ToggleButton>
    </ToggleButtonGroup>
  </Stack>
}