import type { IDetailedMedia } from '../media'
import type { ILessonTimeName, ILessonName } from '../name'
import { ITeacher } from './person'
import { IKlass } from './school'

export type ILessonTime = ILessonTimeName & {
  lessons: ILessonName[]
}

export type ILesson = Omit<ILessonName, 'klass' | 'teacher'> & {
  klass: IKlass
  teacher: ITeacher
  lessonTime: ILessonTimeName
}

export type IHomework = {
  id: string
  specificLesson: string
  student: string
  comment: string
  links: string
  lastModified: string
  files: IDetailedMedia[]
  filesData?: File[]
}

export type INote = {
  id: string
  value: string
  specificLesson: string
  student: string
  comment: string
  lastModified: string
}