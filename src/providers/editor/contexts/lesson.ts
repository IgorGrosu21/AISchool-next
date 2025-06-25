'use client'

import { IDetailedSpecificLesson } from "@/utils/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type SpecificLessonEditorContextType = EditorContextType<IDetailedSpecificLesson>

export const SpecificLessonEditorContext = createContext<SpecificLessonEditorContextType | null>(null)

export const useSpecificLessonEditorContext = () => useContext(SpecificLessonEditorContext)!