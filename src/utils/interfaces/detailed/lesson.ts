import type { ILesson, IHomework, INote, IStudent } from "../listed"
import type { IDetailedMedia } from "../media"
import type { ISpecificLessonName } from "../name"
import type { IKlassWithStudents } from "./school"

export type IDetailedLesson = Omit<ILesson, 'klass'> & {
  klass: IKlassWithStudents
}

export type IDetailedSpecificLesson = Omit<ISpecificLessonName, 'lesson' | 'note'> & {
  desc: string
  links: string,
  files: IDetailedMedia[]
  filesData?: File[]
} & ({
  lesson: ILesson
  canEdit: false
  student: IStudent
  note?: INote
  homework?: IHomework
} | {
  lesson: IDetailedLesson
  canEdit: true
  notes: INote[]
  homeworks: IHomework[]
})