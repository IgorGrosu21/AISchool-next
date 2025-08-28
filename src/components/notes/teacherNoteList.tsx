'use client'

import { IDetailedKlass, ILessonName, ILessonTimeName, INote, ISpecificLesson } from "@/utils/interfaces"
import { Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { format, isWithinInterval, isAfter, startOfDay } from 'date-fns';
import { useEffect, useMemo, useTransition, useRef, useState, useCallback } from "react"
import { fetchTeacherNotes, sendNote } from "@/utils/api";
import { ru } from "date-fns/locale";
import { NotesContainer } from "./container";
import { useJournalContext } from "@/providers";
import { NotePicker } from "./picker";

interface TeacherNoteListProps {
  klass: IDetailedKlass
  subjectSlug: string
}

type ILesson = Omit<ILessonName, 'lessonTime'> & {lessonTime?: ILessonTimeName}

export function TeacherNoteList({klass, subjectSlug}: TeacherNoteListProps) {
  const {personId, period, groups, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [activeNote, setActiveNote] = useState<INote>()
  const [notesOpened, openNotes] = useState(false)

  // Get today's date for comparison
  const today = useMemo(() => startOfDay(new Date(2025, 2, 27)), [])

  useEffect(() => {
    startTransition(async () => {
      const notes = await fetchTeacherNotes(personId, klass.school.slug, klass.slug, subjectSlug, period)
      const groups = klass.students.map(student => {
        return {
          id: student.id,
          name: `${student.user.surname} ${student.user.name}`,
          notes: notes.filter(note => note.student.id === student.id)
        }
      })
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
    
    const isHoliday = (date: Date) => {
      return klass.school.holidays.some(holiday => 
        isWithinInterval(date, {
          start: new Date(holiday.start), 
          end: new Date(holiday.end)
        })
      )
    }
    
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
  }, [klass.school.holidays, period, subjectLessons])

  useEffect(() => {
    if (lessons.length > 0 && tableContainerRef.current) {
      const currentDate = new Date(2025, 2, 25)
      const currentDateStr = format(currentDate, 'y.M.d')
      
      let targetIndex = lessons.findIndex(lesson => lesson.date >= currentDateStr)
      if (targetIndex === -1) {
        targetIndex = lessons.length - 1
      }
      
      const percentage = (targetIndex / (lessons.length - 1)) * 100
      const scrollableWidth = tableContainerRef.current.scrollWidth - tableContainerRef.current.clientWidth
      const scrollPosition = (percentage / 100) * scrollableWidth
      
      tableContainerRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      })
    }
  }, [lessons])

  const pickNote = useCallback((studentId: string, date: string, lesson: ILesson, note?: INote) => {
    const lessonDate = new Date(date)
    if (isAfter(lessonDate, today)) {
      return
    }

    if (note) {
      setActiveNote(note)
      openNotes(true)
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
    openNotes(true)
  }, [klass, today])

  const updateNote = useCallback((note?: INote) => {
    if (!note) {
      setActiveNote(undefined)
      return
    }
    startTransition(async () => {
      const updatedNote = await sendNote(note)
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

  return <NotesContainer loading={isPending}>
    <TableContainer ref={tableContainerRef}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {lessons.map((lesson, i) => (
              <TableCell key={i}>
                <Button variant='outlined' sx={{p: 1, width: 50, minWidth: 'unset'}}>
                  <Stack>
                    <Typography sx={{textAlign: 'center'}}>{format(new Date(lesson.date), 'd')}</Typography>
                    <Typography sx={{textAlign: 'center'}}>{format(new Date(lesson.date), 'MMM', {locale: ru}).replace('.', '')}</Typography>
                  </Stack>
                </Button>
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group, i) => <TableRow key={i} hover>
            <TableCell sx={{position: 'sticky', left: 0, zIndex: 2, bgcolor: 'background.paper'}}>
              <Typography variant='h6' color='primary'>{group.name}</Typography>
            </TableCell>
            {lessons.map((lessonWithDate, j) => {
              const note = group.notes.find(n => 
                n.specificLesson.lesson.id === lessonWithDate.lesson.id &&
                n.student.id === group.id &&
                n.specificLesson.date === format(lessonWithDate.date, 'y.MM.dd')
              )
              const lessonDate = new Date(lessonWithDate.date)
              const isFutureLesson = isAfter(lessonDate, today)
              
              return <TableCell key={j} sx={{ textAlign: 'center' }}>
                <Button 
                  variant='outlined' 
                  onClick={() => pickNote(group.id, format(lessonWithDate.date, 'y.MM.dd'), lessonWithDate.lesson, note)}
                  disabled={isFutureLesson}
                  sx={{
                    p: 1,
                    minWidth: 'unset',
                    height: 50,
                    aspectRatio: 1
                  }}
                >
                  <Typography variant='h6' color='primary'>{note?.value ?? ''}</Typography>
                </Button>
              </TableCell>
            })}
            <TableCell sx={{position: 'sticky', right: 0, zIndex: 2, bgcolor: 'background.paper'}}>
              <Typography variant='h6' color='primary'>
                {group.performance}
              </Typography>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
    <NotePicker<INote>
      notesOpened={notesOpened}
      openNotes={openNotes}
      activeNote={activeNote}
      updateNote={updateNote}
      hasNotes={activeNote?.specificLesson.lesson.subject.hasNotes ?? true}
      link={`/core/lessons/${klass.school.slug}/${klass.slug}/${activeNote?.specificLesson.lesson.id}/${activeNote?.specificLesson.date}/`}
    />
  </NotesContainer>
}