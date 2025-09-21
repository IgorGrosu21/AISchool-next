'use client'

import { IDetailedKlass, ILessonName, ILessonTimeName, INote, ISpecificLesson } from "@/utils/interfaces"
import { format, isAfter, startOfDay } from 'date-fns';
import { useEffect, useMemo, useTransition, useState, useCallback } from "react"
import { useJournalContext } from "@/providers";
import { editNote, getGroupedTeacherNotes } from "@/app/actions/note";
import { useHolidayChecker } from "../calendar/useHoliday";

type ILesson = Omit<ILessonName, 'lessonTime'> & {lessonTime?: ILessonTimeName}

export function useTeacherNotes(klass: IDetailedKlass, subjectSlug: string) {
  const {personId, period, groups, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()
  const [activeNote, setActiveNote] = useState<INote>()
  const isHoliday = useHolidayChecker(klass.school.holidays)

  // Get today's date for comparison
  const today = useMemo(() => startOfDay(new Date(2025, 2, 27)), [])

  useEffect(() => {
    startTransition(async () => {
      const groups = await getGroupedTeacherNotes(personId, klass, subjectSlug, period)
      updateGroups(groups)
    })
  }, [subjectSlug, period, klass, updateGroups, personId])

  const subjectLessons = useMemo(() => {
    return klass.lessons.filter(lesson => lesson.subject.slug === subjectSlug).map(lesson => {
      const lessonTime = klass.school.timetable.find(lessonTime => lessonTime.id === lesson.lessonTime)
      return {
        ...lesson,
        lessonTime: lessonTime
      }
    }).filter(lesson => lesson.lessonTime !== undefined)
  }, [klass.lessons, klass.school.timetable, subjectSlug])

  const lessons = useMemo(() => {
    const [startDate, endDate] = period.split('-').map(dateStr => {
      const [year, month, day] = dateStr.split('.').map(Number)
      return new Date(year, month - 1, day)
    })
    
    const lessonsInPeriod: Array<{
      lesson: ILesson
      date: string
    }> = []
    
    const weekdayMap = { 'MO': 1, 'TU': 2, 'WE': 3, 'TH': 4, 'FR': 5, 'SA': 6, 'SU': 0 }
    const lessons = subjectLessons.map(lesson => {
      const currentDate = new Date(startDate)
      const targetWeekday = weekdayMap[lesson.lessonTime!.weekday]
      while (currentDate.getDay() !== targetWeekday) {
        currentDate.setDate(currentDate.getDate() + 1)
      }
      return {
        ...lesson,
        date: currentDate
      }
    })

    while (lessons.every(lesson => lesson.date <= endDate)) {
      for (const lesson of lessons) {
        if (!isHoliday(lesson.date)) {
          lessonsInPeriod.push({
            lesson: lesson,
            date: format(lesson.date, 'y.M.d')
          })
        }
        lesson.date.setDate(lesson.date.getDate() + 7)
      }
    }
   return lessonsInPeriod
  }, [isHoliday, period, subjectLessons])

  const pickNote = useCallback((studentId: string, date: string, lesson: ILesson, note?: INote) => {
    const lessonDate = new Date(date)
    if (isAfter(lessonDate, today)) {
      return
    }

    if (note) {
      setActiveNote(note)
      return
    }
    const student = klass.students.find(s => s.id === studentId)
    if (!student) {
      return
    }
    const specificLesson: ISpecificLesson = {
      id: '',
      lesson: {
        ...lesson,
        klass: {
          id: klass.id,
          grade: klass.grade,
          letter: klass.letter,
          profile: klass.profile,
          school: {
            id: klass.school.id,
            name: klass.school.name,
            city: klass.school.city,
            slug: klass.school.slug
          },
          slug: klass.slug,
          networth: klass.networth
        },
        teacher: undefined,
        lessonTime: lesson.lessonTime!,
      },
      date: date,
      title: '',
      desc: '',
      files: [],
      links: ''
    }
    setActiveNote({
      id: '',
      value: '',
      specificLesson: specificLesson,
      student: student,
      comment: '',
      lastModified: ''
    })
  }, [klass, today])

  const updateNote = useCallback((note?: INote) => {
    if (!note) {
      setActiveNote(undefined)
      return
    }
    startTransition(async () => {
      const [updatedNote] = await editNote(note)
      if (!updatedNote) {
        return
      }
      const newGroups = groups.map(group => {
        if (group.id === note.student.id) {
          if (note.id === '') {
            return {
              ...group,
              notes: [...group.notes, updatedNote]
            }
          }
          return {
            ...group,
            notes: group.notes.map(n => n.id === note.id ? updatedNote : n)
          }
        }
        return group
      })
      updateGroups(newGroups)
      setActiveNote(undefined)
    })
  }, [groups, updateGroups])

  return {
    isPending, today, lessons,
    activeNote, setActiveNote, pickNote, updateNote
  }
}