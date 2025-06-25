'use client'

import { createContext, useContext } from "react"

export type CalendarContextType = {
  year: number
  monthGroups: Date[][]
  activeMonth?: Date
  setActiveMonth: (month?: Date) => void
  currentMonth: Date
  activeDay?: Date
  setActiveDay: (day?: Date) => void
  currentDay: Date
}

export const CalendarContext = createContext<CalendarContextType | null>(null)

export const useCalendarContext = () => useContext(CalendarContext)!