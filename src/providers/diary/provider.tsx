'use client'

import { ProviderProps } from "react"
import { ILessonTimeName, ILessonName } from "@/interfaces";

import { DiaryContext } from "./context";

interface DiaryProviderValue {
  lessonTimes: ILessonTimeName[]
  lessons: ILessonName[]
  accountType: 'teacher' | 'student'
  personId: string
  schoolSlug?: string
  holidays: Array<{start: string, end: string}>
}

export function DiaryProvider({children, value}: ProviderProps<DiaryProviderValue>) {
  return <DiaryContext.Provider value={{
    lessonTimes: value.lessonTimes,
    lessons: value.lessons,
    accountType: value.accountType,
    personId: value.personId,
    schoolSlug: value.schoolSlug,
    holidays: value.holidays
  }}>
    {children}
  </DiaryContext.Provider>
}