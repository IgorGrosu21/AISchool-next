'use server'

import { deleteHomework, deleteHomeworkPhoto, deleteSpecificLessonPhoto, fetchSpecificLessonNames, sendHomework, sendHomeworkPhoto, sendSpecificLesson, sendSpecificLessonPhoto } from "@/utils/api"
import { IDetailedSpecificLesson, IKlassWithDiary } from "@/utils/interfaces"

export async function getSpecificLessons(klass: IKlassWithDiary, startDay: string, endDay: string) {
  return fetchSpecificLessonNames(klass.school.id, klass.id, `${startDay}-${endDay}`)
}

export async function editSpecificLesson(instance: IDetailedSpecificLesson) {
  const data = await sendSpecificLesson(instance)
  if (data) {
    await Promise.all(instance.files.filter(f => f.delete === true).map(f => {
      return deleteSpecificLessonPhoto(instance, f.id)
    }))
    data.files = instance.files.filter(f => f.delete !== true)
    if (instance.filesData) {
      const files = await Promise.all(instance.filesData.map(fd => {
        const formData = new FormData();
        formData.append('file', fd);
        return sendSpecificLessonPhoto(instance, formData)
      }))
      data.files = [...data.files, ...files.filter(f => f !== undefined)]
    }
  }
  return data ?? instance
}

export async function editHomework(instance: IDetailedSpecificLesson) {
  if (!instance.canEdit && instance.homework) {
    const homework = instance.homework
    const noFilesData = homework.filesData === undefined || homework.filesData.length === 0
    const isEmpty = homework.comment === '' && homework.files.length === 0 && homework.links === '' && noFilesData

    if (!isEmpty) {
      const data = await sendHomework(instance)
      if (data) {
        await Promise.all(instance.homework.files.filter(f => f.delete === true).map(f => {
          return deleteHomeworkPhoto(instance, homework.student, f.id)
        }))
        data.files = instance.homework.files.filter(f => f.delete !== true)
        if (instance.homework.filesData) {
          const files = await Promise.all(instance.homework.filesData.map(fd => {
            const formData = new FormData();
            formData.append('file', fd);
            return sendHomeworkPhoto(instance, formData)
          }))
          data.files = [...data.files, ...files.filter(f => f !== undefined)]
        }
        instance.homework = data
      }
    } else if (homework.id !== '' && isEmpty) {
      await deleteHomework(instance)
      instance.homework = undefined
    }
  }
  return instance
}