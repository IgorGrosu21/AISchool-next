'use server'

import {
  errorHandler,
  fetchSpecificLessonNames, sendSpecificLesson, deleteSpecificLesson,
  sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  sendHomework, deleteHomework,
  sendHomeworkPhoto, deleteHomeworkPhoto
} from "@/utils/api";
import { IDetailedHomework, IDetailedSpecificLesson } from "@/utils/interfaces"
import { EditActionFunction } from "./template";

export async function getSpecificLessons(accountType: string, personId: string, startDay: string, endDay: string, schoolSlug?: string) {
  const [specificLessonNames, status] = await fetchSpecificLessonNames(accountType, personId, `${startDay}-${endDay}`, schoolSlug)
  return await errorHandler(specificLessonNames, status)
}

function hasFilesOrLinks(instance: IDetailedSpecificLesson | IDetailedHomework) {
  const noFilesData = instance.filesData === undefined || instance.filesData.length === 0
  return instance.files.length === 0 && instance.links === '' && noFilesData
}

export const editSpecificLesson: EditActionFunction<IDetailedSpecificLesson> = async (instance) => {
  const hasContent = instance.title !== '' || instance.desc !== ''
  const isEmpty = !hasContent && hasFilesOrLinks(instance) && instance.notes.length === 0 && instance.homeworks.length === 0
  
  if (!isEmpty) {
    instance.students = []
    const [data, status] = await sendSpecificLesson(instance)
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
        data.files = [...data.files, ...files.map(f => f[0]).filter(f => f !== undefined)]
      }
    }
    return [data, status]
  } else if (instance.id !== '' && isEmpty) {
    await deleteSpecificLesson(instance)
  }
  return [instance, 200]
}

export const editHomework: EditActionFunction<IDetailedHomework> = async (instance) => {
  const isEmpty = hasFilesOrLinks(instance) && instance.note === undefined && instance.comment === ''

  if (!isEmpty) {
    const [data, status] = await sendHomework(instance)
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
        data.files = [...data.files, ...files.map(f => f[0]).filter(f => f !== undefined)]
      }
    }
    return [data, status]
  } else if (instance.id !== '' && isEmpty) {
    await deleteHomework(instance)
  }
  return [instance, 200]
}