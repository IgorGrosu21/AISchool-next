'use server'

import {
  fetchSpecificLessonNames, sendSpecificLesson, deleteSpecificLesson,
  sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  sendHomework, deleteHomework,
  sendHomeworkPhoto, deleteHomeworkPhoto
} from "@/utils/api";
import { IDetailedHomework, IDetailedSpecificLesson } from "@/utils/interfaces"

export async function getSpecificLessons(accountType: string, personId: string, startDay: string, endDay: string, schoolSlug?: string) {
  return fetchSpecificLessonNames(accountType, personId, `${startDay}-${endDay}`, schoolSlug)
}

function hasFilesOrLinks(instance: IDetailedSpecificLesson | IDetailedHomework) {
  const noFilesData = instance.filesData === undefined || instance.filesData.length === 0
  return instance.files.length === 0 && instance.links === '' && noFilesData
}

export async function editSpecificLesson(instance: IDetailedSpecificLesson) {
  const hasContent = instance.title !== '' || instance.desc !== ''
  const isEmpty = !hasContent && hasFilesOrLinks(instance) && instance.notes.length === 0 && instance.homeworks.length === 0
  
  if (!isEmpty) {
    instance.students = []
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
  }
  return instance
}

export async function editHomework(instance: IDetailedHomework) {
  const isEmpty = hasFilesOrLinks(instance) && instance.note === undefined && instance.comment === ''

  if (!isEmpty) {
    const data = await sendHomework(instance)
    if (data) {
      await Promise.all(instance.files.filter(f => f.delete === true).map(f => {
        return deleteHomeworkPhoto(instance, f.id)
      }))
      data.files = instance.files.filter(f => f.delete !== true)
      if (instance.filesData) {
        const files = await Promise.all(instance.filesData.map(fd => {
          const formData = new FormData();
          formData.append('file', fd);
          return sendHomeworkPhoto(instance, formData)
        }))
        data.files = [...data.files, ...files.filter(f => f !== undefined)]
      }
      instance = data
    }
  } else if (instance.id !== '' && isEmpty) {
    await deleteHomework(instance)
  }
  return instance
}