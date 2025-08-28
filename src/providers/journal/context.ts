'use client'

import { INote } from "@/utils/interfaces"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

export type Semester = 'frst' | 'scnd' | 'annual'
export type Absences = {
  ma: number
  ua: number
  da: number
  total: number
}
export type Group = {
  id: string
  name: string
  notes: INote[]
  performance: string,
  absences: Absences,
  extraNotes: number
}

export type JournalContextType = {
  personId: string
  semester: Semester
  setSemester: Dispatch<SetStateAction<Semester>>
  period: string
  groups: Group[]
  updateGroups: (rawGroups: Array<{id: string, name: string, notes: INote[]}>) => void
}

export const JournalContext = createContext<JournalContextType | null>(null)

export const useJournalContext = () => useContext(JournalContext)!