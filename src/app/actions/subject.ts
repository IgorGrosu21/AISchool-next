'use server'

import { sendTask } from "@/utils/api"
import { IDetailedTopic, ITask } from "@/utils/interfaces"

export async function completeTask(topic: IDetailedTopic, theory: ITask) {
  if (!topic.completedTasks.includes(theory.slug)) {
    await sendTask(topic, theory)
  }
}