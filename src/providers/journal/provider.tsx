'use client'

import { ProviderProps, useCallback, useMemo, useState } from "react"
import { INote } from "@/interfaces";
import { getYear, getMonth } from 'date-fns';

import { JournalContext, Semester, Group } from "./context";

interface JournalProviderValue {
  personId: string
  period: string
  groups: Array<{
    id: string
    name: string
    notes: INote[]
  }>
}

export function JournalProvider({children, value}: ProviderProps<JournalProviderValue>) {
  const currentDate = useMemo(() => new Date(2025, 2, 25), [])
  const currentYear = useMemo(() => getYear(currentDate), [currentDate])
  const currentMonth = useMemo(() => getMonth(currentDate) + 1, [currentDate])
  const year = useMemo(() => currentMonth < 9 ? currentYear : currentYear + 1, [currentYear, currentMonth])

  const [semester, setSemester] = useState<Semester>(value.period.includes('09.01') ? 'frst' : 'scnd')
  const period = useMemo(() => {
    if (semester === 'frst') {
      return `${year - 1}.09.01-${year - 1}.12.31`;
    } else if (semester === 'scnd') {
      return `${year}.01.01-${year}.05.31`;
    }
    return `${year - 1}.09.01-${year}.05.31`;
  }, [semester, year])

  const [groups, setGroups] = useState<Group[]>(value.groups.map(group => ({
    id: group.id,
    name: group.name,
    notes: group.notes,
    performance: '-',
    absences: {ma: 0, ua: 0, da: 0, total: 0},
    extraNotes: 0
  })))

  const updateGroups = useCallback((rawGroups: Array<{id: string, name: string, notes: INote[]}>) => {
    const groups = rawGroups.map(group => {
      let [sum, count] = [0, 0]
      group.notes.forEach(note => {
        if (note.value !== '' && !note.value.includes('a')) {
          sum += parseInt(note.value)
          count++
        }
      })
      const performance = count > 0 ? Math.round((sum / count) * 100) / 100 : 0
      const absences = {
        ma: group.notes.filter(note => note.value === 'ma').length,
        ua: group.notes.filter(note => note.value === 'ua').length,
        da: group.notes.filter(note => note.value === 'da').length,
      }
      let extraNotes = 0
      if (performance < 9 && performance > 0) {
        extraNotes = Math.ceil(count * (Math.floor(performance) + 1 - performance) / (9 - Math.floor(performance)))
      }
      return {
        id: group.id,
        name: group.name,
        notes: group.notes,
        performance: performance === 0 ? '-' : performance.toFixed(2),
        absences: {
          ...absences,
          total: absences.ma + absences.ua + absences.da
        },
        extraNotes
      }
    })
    /*
      Algorithm:
      - count - number of notes (n)
      - performance - average note (S)
      - extraNotes - number of notes to the next grade (k)
      Formula:
        (nS + 10k) / (n + k) >= floor(S) + 1
        nS + 10k >= (floor(S) + 1)(n + k)
        nS + 10k >= (floor(S) + 1)n + (floor(S) + 1)k
        10k - (floor(S) + 1)k >= (floor(S) + 1)n - nS
        k(10 - floor(S) - 1) >= n(floor(S) + 1 - S)
        k >= n(1 - fraq(S)) / (9 - floor(S))
        where fraq(S) = S - floor(S)
        indeed, max(floor(S)) = 8 (we do not calculate how many 10s we need to get performance = 10.0)
        so, no edge cases
    */
    setGroups(groups)
  }, [])

  return <JournalContext.Provider value={{
    personId: value.personId,
    semester,
    setSemester,
    period,
    groups,
    updateGroups
  }}>
    {children}
  </JournalContext.Provider>
}