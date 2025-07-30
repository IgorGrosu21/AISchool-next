import type { ILesson, IHomework, INote, IStudent } from "../listed"
import type { IDetailedMedia } from "../media"
import type { ISpecificLessonName } from "../name"

export type IDetailedSpecificLesson = Omit<ISpecificLessonName, 'lesson' | 'note'> & {
  desc: string
  links: string,
  files: IDetailedMedia[]
  filesData?: File[]
  lesson: ILesson
} & ({
  canEdit: false
  student: IStudent
  note?: INote
  homework?: IHomework
} | {
  canEdit: true
  students: IStudent[]
  notes: INote[]
  homeworks: IHomework[]
})