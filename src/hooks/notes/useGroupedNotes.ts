'use client'

import { useMemo } from "react"
import { useJournalContext } from "@/providers"

type Absences = {
  ma: number
  ua: number
  da: number
  total: number
}

const allAbsences: Array<keyof Absences> = ['ma', 'ua', 'da']

function roundToHundreeds(val: number, q: number) {
  return Math.round(val / q * 100) / 100
}

export function useGroupedNotes() {
  const {semester, period, groups} = useJournalContext()

  // Determine if today is in the first semester (September 1st to December 31st)
  const isFirstSemester = useMemo(() => {
    const today = new Date(2025, 2, 25)
    const currentMonth = today.getMonth() + 1 // getMonth() returns 0-11, so add 1
    return currentMonth >= 9 && currentMonth <= 12
  }, [])

  const annualGroups = useMemo(() => {
    if (semester !== 'annual') {
      return undefined
    }
    return groups.map(group => {
      let [frstSum, frstCount, scndSum, scndCount] = [0, 0, 0, 0]
      const firstSemesterEnd = new Date(`${period.split('-')[0].split('.')[0]}.12.31`)
      let isInFirstSemester = true
      group.notes.forEach(note => {
        const date = new Date(note.specificLesson.date)
        if (date > firstSemesterEnd) {
          isInFirstSemester = false
        }
        if (isInFirstSemester) {
          if (note.value !== '' && !note.value.includes('a')) {
            frstSum += parseInt(note.value)
            frstCount++
          }
        } else { 
          if (note.value !== '' && !note.value.includes('a')) {
            scndSum += parseInt(note.value)
            scndCount++
          }
        }
      })
      const frstPerformance = frstCount > 0 ? roundToHundreeds(frstSum, frstCount) : 0
      const scndPerformance = scndCount > 0 ? roundToHundreeds(scndSum, scndCount) : 0
      const semestersCount = (frstPerformance > 0 ? 1 : 0) + (scndPerformance > 0 ? 1 : 0)
      const annualPerformance = semestersCount > 0 ? roundToHundreeds(frstPerformance + scndPerformance, semestersCount).toFixed(2) : '-'
      return {
        id: group.id,
        name: group.name,
        notes: [frstPerformance === 0 ? '-' : frstPerformance.toFixed(2), scndPerformance === 0 ? '-' : scndPerformance.toFixed(2)],
        performance: annualPerformance,
        absences: group.absences,
      }
    })
  }, [groups, period, semester])

  const absences = useMemo(() => {
    const groups1 = annualGroups ?? groups
    return allAbsences.map(absence => ({
      name: absence,
      value: groups1.reduce((acc, group) => acc + group.absences[absence], 0)
    }))
  }, [annualGroups, groups])

  const performance = useMemo(() => {
    let [sum, count] = [0, 0]
    const groups1 = annualGroups ?? groups
    groups1.forEach(group => {
      if (group.performance !== '-' && group.performance !== '0.00') {
        sum += parseFloat(group.performance)
        count++
      }
    })
    return count > 0 ? roundToHundreeds(sum, count).toFixed(2) : '-'
  }, [annualGroups, groups])

  return {
    isFirstSemester,
    annualGroups,
    absences,
    performance
  }
}