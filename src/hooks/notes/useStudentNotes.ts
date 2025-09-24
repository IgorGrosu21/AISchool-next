'use client'

import { INote, ISubjectName } from "@/interfaces"
import { useCallback, useEffect, useTransition } from "react"
import { useJournalContext } from "@/providers";
import { getGroupedStudentNotes } from "@/app/actions"

export function useStudentNotes(subjects: ISubjectName[]) {
  const {personId, period, updateGroups} = useJournalContext()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const groups = await getGroupedStudentNotes(personId, period, subjects)
      updateGroups(groups)
    })
  }, [period, subjects, updateGroups, personId])

  const getHref = useCallback((note: INote) => {
    const studentId = note.student.id
    const specificLesson = note.specificLesson
    const lesson = specificLesson.lesson
    const klassSlug = lesson.klassSlug
    const schoolSlug = lesson.klass.school.slug

    return `/core/homeworks/${schoolSlug}/${klassSlug}/${studentId}/${lesson.id}/${specificLesson.id}`
  }, [])

  return {
    isPending,
    getHref
  }
}