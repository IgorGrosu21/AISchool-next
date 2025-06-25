'use server'

import { sendTheory } from "@/utils/api"
import { IDetailedTopic, ITheory } from "@/utils/interfaces"

export async function completeTheory(topic: IDetailedTopic, theory: ITheory) {
  if (!topic.completedTheories.includes(theory.slug)) {
    await sendTheory(topic, theory)
  }
}