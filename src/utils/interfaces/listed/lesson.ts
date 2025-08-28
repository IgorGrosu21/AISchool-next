import type { IDetailedMedia } from '../media'
import type { ILessonTimeName, ILessonName, ISpecificLessonName, IStudentName, INoteName } from '../name'
import type { ITeacher } from './person'
import type { IKlass } from './school'

export type ILessonTime = ILessonTimeName & {
  lessons: ILessonName[]
  school: string
}

export type ILesson = Omit<ILessonName, 'klass' | 'teacher' | 'lessonTime'> & {
  klass: IKlass
  teacher?: ITeacher
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
}

export type INote = Omit<INoteName, 'specificLesson' | 'student'> & {
  specificLesson: ISpecificLesson
  student: IStudentName
}

export type ISpecificLesson = Omit<ISpecificLessonName, 'lesson'> & {
  lesson: ILesson
  files: IDetailedMedia[]
  links: string
}