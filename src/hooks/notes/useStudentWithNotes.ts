'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { INoteName, IStudent } from '@/utils/interfaces'
import { useSpecificLessonEditorContext } from '@/providers'

export function useStudentWithNotes() {
  const { instance: specificLesson, setInstance: setSpecificLesson } = useSpecificLessonEditorContext()
  const students: IStudent[] = useMemo(() => specificLesson.students, [specificLesson])
  
  const [activeStudent, setActiveStudent] = useState<IStudent>(students[0])
  const newNote: INoteName = useMemo(() => ({
    id: '',
    value: '',
    specificLesson: specificLesson.id,
    student: activeStudent.id,
    comment: '',
    lastModified: ''
  }), [activeStudent.id, specificLesson.id])
  const [activeNote, setActiveNote] = useState<INoteName>()
  const activeHomework = useMemo(() => specificLesson.homeworks.find(h => h.student === activeStudent.id), [specificLesson.homeworks, activeStudent])
  
  useEffect(() => {
    if (activeNote === undefined || activeNote?.student !== activeStudent.id) {
      const note = specificLesson.notes.find(n => n.student === activeStudent.id)
      if (note) {
        setActiveNote(note)
      }
    }
  }, [activeNote, activeStudent, specificLesson.notes])
  
  useEffect(() => {
    if (activeNote) {
      setSpecificLesson(s => ({...s, notes: [...s.notes.filter(n => n.student != activeNote.student), activeNote]}))
    }
  }, [activeNote, setSpecificLesson])

  const updateNote = useCallback((note?: INoteName) => {
    setActiveNote(n => note ?? n)
  }, [])

  const updateNoteComment = useCallback((comment: string) => {
    setActiveNote(n => n ? {...n, comment} : {...newNote, comment})
  }, [newNote])

  return {
    students, activeStudent, setActiveStudent,
    activeHomework, activeNote, updateNote, updateNoteComment
  }
}