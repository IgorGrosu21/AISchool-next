'use server'

import { errorHandler, sendTask } from "@/requests"
import { IDetailedTopic, ITask } from "@/interfaces"

export async function completeTask(topic: IDetailedTopic, theory: ITask) {
  if (!topic.completedTasks.includes(theory.slug)) {
    const res = await sendTask(topic, theory)
    if (res) {
      const [dataRaw, status] = res
      const data = await errorHandler(dataRaw, status)
      return data
    }
  }
}