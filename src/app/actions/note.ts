'use server'

import { errorHandler, fetchStudentNotes, fetchTeacherNotes, sendNote } from "@/utils/api"
import { IDetailedKlass, INote, ISubjectName } from "@/utils/interfaces"
import { EditActionFunction } from "./template"

export async function getGroupedStudentNotes(personId: string, period: string, subjects: ISubjectName[]) {
  const [notesRaw, status] = await fetchStudentNotes(personId, period)
  const notes = await errorHandler(notesRaw, status)
  const groups = subjects.map(subject => {
    return {
      id: subject.id,
      name: subject.verboseName,
      notes: notes.filter(note => note.specificLesson.lesson.subject.id === subject.id)
    }
  })

  return groups
}

export async function getGroupedTeacherNotes(personId: string, klass: IDetailedKlass, subjectSlug: string, period: string) {
  const [notesRaw, status] = await fetchTeacherNotes(personId, klass.school.slug, klass.slug, subjectSlug, period)
  const notes = await errorHandler(notesRaw, status)
  const groups = klass.students.map(student => {
    return {
      id: student.id,
      name: `${student.user.surname} ${student.user.name}`,
      notes: notes.filter(note => note.student.id === student.id)
    }
  })
  return groups
}

export const editNote: EditActionFunction<INote> = async (instance) => {
  return sendNote(instance)
}