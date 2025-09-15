'use server'

import { fetchStudentNotes, fetchTeacherNotes, sendNote } from "@/utils/api"
import { IDetailedKlass, INote, ISubjectName } from "@/utils/interfaces"

export async function getGroupedStudentNotes(personId: string, period: string, subjects: ISubjectName[]) {
  const notes = await fetchStudentNotes(personId, period)
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
  const notes = await fetchTeacherNotes(personId, klass.school.slug, klass.slug, subjectSlug, period)
  const groups = klass.students.map(student => {
    return {
      id: student.id,
      name: `${student.user.surname} ${student.user.name}`,
      notes: notes.filter(note => note.student.id === student.id)
    }
  })
  return groups
}

export async function editNote(note: INote) {
  return sendNote(note)
}