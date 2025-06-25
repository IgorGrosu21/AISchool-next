import { ILessonTimeName } from "@/utils/interfaces"

export const weekdays: ILessonTimeName['weekday'][] = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA']
export const getLessonGroups = <T extends ILessonTimeName>(timetable: T[]) => weekdays.map(w => ({
  weekday: w,
  timetable: timetable.filter(l => l.weekday === w)
}))