'use client'

import { INoteName } from "@/interfaces"
import { useCallback, useEffect, useState } from "react"

type Note = Omit<INoteName, 'specificLesson' | 'student'>

export function useNotePicker<T extends Note>(activeNote: T | undefined, updateNote: (note: T | undefined) => void, closeNotes: () => void) {
  const [newNote, setNewNote] = useState<T | undefined>(activeNote)

  useEffect(() => {
    setNewNote(activeNote)
  }, [activeNote])

  const discard = useCallback(() => {
    setNewNote(activeNote)
  }, [activeNote])

  const save = useCallback(() => {
    updateNote(newNote)
    closeNotes()
  }, [newNote, updateNote, closeNotes])

  const updateNoteValue = useCallback((value: string) => {
    setNewNote(n => n ? {...n, value} : undefined)
  }, [])

  const updateNoteComment = useCallback((comment: string) => {
    setNewNote(n => n ? {...n, comment} : undefined)
  }, [])

  return {
    newNote,
    discard,
    save,
    updateNoteValue,
    updateNoteComment
  }
}