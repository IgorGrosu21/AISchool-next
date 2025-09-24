'use client'

import { ISchoolWithTimetable, ILessonTime, ILessonTimeName } from "@/interfaces"
import { useEffect, useCallback, useState } from "react"

const weekdays: ILessonTimeName['weekday'][] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA']
const defaultLessonCount = 8

export function useLessonTimeEditor(school: ISchoolWithTimetable, setTimetable: (timetable: ILessonTime[]) => void) {
  const [duration, setDuration] = useState(45)
  
  useEffect(() => {
    if (school.timetable.length < weekdays.length * defaultLessonCount) {
      const newTimetable: ILessonTime[] = []
      for (const weekday of weekdays) {
        const lessonTimeList = school.timetable.filter(l => l.weekday === weekday)
        const fullLessonTimeList: ILessonTime[] = []
        if (lessonTimeList.length < 8) {
          for (let i = 0; i < defaultLessonCount; i++) {
            fullLessonTimeList.push(lessonTimeList.find(l => l.order === i) ?? {
              id: '',
              starting: '',
              ending: '',
              weekday: weekday,
              order: i,
              lessons: [],
              school: school.id
            })
          }
        }
        newTimetable.push(...fullLessonTimeList)
      }
      setTimetable(newTimetable)
    }
  }, [setTimetable, school.timetable, school.id])

  const updateTime = useCallback((weekday: ILessonTime['weekday'], order: number, type: 'starting' | 'ending', value: string) => {
    if (value === '') {
      return setTimetable(
        school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, starting: '', ending: ''} : l)
      )
    }
    if (type === 'ending') {
      return setTimetable(
        school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, ending: value} : l)
      )
    }
    if (value.length === 5 && value.includes(':')) {
      const copy = [...school.timetable]
      copy.forEach((l, i) => {
        if (l.order === order) {
          let [hours, minutes] = value.split(':').map(Number)
          minutes += duration
          if (minutes >= 60) {
            hours += Math.floor(minutes / 60)
            minutes %= 60
          }
          copy[i] = {...l, starting: value, ending: `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`}
        }
      })
      return setTimetable(copy)
    }
    setTimetable(
      school.timetable.map(l => l.weekday === weekday && l.order === order ? {...l, starting: value} : l)
    )
    
  }, [duration, setTimetable, school.timetable])

  return { duration, setDuration, updateTime }
}