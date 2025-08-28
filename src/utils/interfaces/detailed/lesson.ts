import type { IHomework, IStudent, ISpecificLesson, ILesson } from "../listed"
import type { INoteName, ISpecificLessonName } from "../name"

export type IDetailedLesson = ILesson & {
  specificLessons: ISpecificLessonName[]
}

export type IDetailedSpecificLesson = ISpecificLesson & {
  filesData?: File[]
  students: IStudent[]
  notes: INoteName[]
  homeworks: IHomework[]
}

export type IDetailedHomework = Omit<IHomework, 'student'> & {
  filesData?: File[]
  specificLesson: ISpecificLesson
  note?: INoteName
  student: IStudent
}