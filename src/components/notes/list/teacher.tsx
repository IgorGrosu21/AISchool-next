'use client'

import { IDetailedKlass, INote } from "@/utils/interfaces"
import { Button, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { format, isAfter } from 'date-fns';
import { useEffect, useRef } from "react"
import { ru } from "date-fns/locale";
import { NotesContainer } from "../container";
import { useJournalContext } from "@/providers";
import { NotePicker } from "../picker";
import { useTeacherNotes } from "@/hooks";
import { Note } from "../item";

interface TeacherNoteListProps {
  klass: IDetailedKlass
  subjectSlug: string
}

export function TeacherNoteList({klass, subjectSlug}: TeacherNoteListProps) {
  const {groups} = useJournalContext()
  const {
    isPending, today, lessons,
    activeNote, setActiveNote, pickNote, updateNote
  } = useTeacherNotes(klass, subjectSlug)
  const tableContainerRef = useRef<HTMLDivElement>(null)

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
                <Note
                  value={note?.value}
                  onClick={() => pickNote(group.id, format(lessonWithDate.date, 'y.MM.dd'), lessonWithDate.lesson, note)}
                  disabled={isFutureLesson}
                />
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
      notesOpened={activeNote !== undefined}
      closeNotes={() => setActiveNote(undefined)}
      activeNote={activeNote}
      updateNote={updateNote}
      hasNotes={activeNote?.specificLesson.lesson.subject.hasNotes ?? true}
      link={`/core/lessons/${klass.school.slug}/${klass.slug}/${activeNote?.specificLesson.lesson.id}/${activeNote?.specificLesson.date}/`}
    />
  </NotesContainer>
}