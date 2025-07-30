'use server'

import {
  fetchSpecificLessonNames, sendSpecificLesson, deleteSpecificLesson, sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  sendHomework, deleteHomework, sendHomeworkPhoto, deleteHomeworkPhoto
} from "@/utils/api";
import { IDetailedSpecificLesson, IHomework, IKlassWithDiary } from "@/utils/interfaces"

export async function getSpecificLessons(klass: IKlassWithDiary, startDay: string, endDay: string) {
  return fetchSpecificLessonNames(klass.school.id, klass.id, `${startDay}-${endDay}`)
}

function hasFilesOrLinks(instance: IDetailedSpecificLesson | IHomework) {
  const noFilesData = instance.filesData === undefined || instance.filesData.length === 0
  return instance.files.length === 0 && instance.links === '' && noFilesData
}

export async function editSpecificLesson(instance: IDetailedSpecificLesson) {
  if (instance.canEdit) {
    const isEmpty = hasFilesOrLinks(instance) && instance.notes.length === 0 && instance.homeworks.length === 0
    
    if (!isEmpty) {
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
    } else if (instance.id !== '' && isEmpty) {
      await deleteSpecificLesson(instance)
      return undefined
    }
    
  }
  return instance
}

export async function editHomework(instance: IDetailedSpecificLesson) {
  if (!instance.canEdit && instance.homework) {
    const homework = instance.homework
    const isEmpty = hasFilesOrLinks(homework) && homework.comment === ''

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