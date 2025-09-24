'use client'

import { ILessonTimeName, ILessonName } from "@/interfaces"
import { createContext, useContext } from "react"

export type DiaryContextType = {
  lessonTimes: ILessonTimeName[]
  lessons: ILessonName[]
  accountType: 'teacher' | 'student'
  personId: string
  schoolSlug?: string
  holidays: Array<{start: string, end: string}>
}

export const DiaryContext = createContext<DiaryContextType | null>(null)

export const useDiaryContext = () => useContext(DiaryContext)!