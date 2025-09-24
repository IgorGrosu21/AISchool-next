import type { IHomework, IStudent, ISpecificLesson, ILesson } from "../listed"
import type { INoteName, ISpecificLessonName } from "../name"
import type { ICanEdit } from "./canEdit"

export type IDetailedLesson = ILesson & {
  specificLessons: ISpecificLessonName[]
}

export type IDetailedSpecificLesson = ISpecificLesson & ICanEdit & {
  filesData?: File[]
  students: IStudent[]
  notes: INoteName[]
  homeworks: IHomework[]
  isStudent: boolean
}

export type IDetailedHomework = Omit<IHomework, 'student'> & ICanEdit & {
  filesData?: File[]
  specificLesson: ISpecificLesson
  note?: INoteName
  student: IStudent
}