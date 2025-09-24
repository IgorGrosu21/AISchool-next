'use client'

import { IDetailedHomework, IDetailedSpecificLesson } from "@/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type SpecificLessonEditorContextType = EditorContextType<IDetailedSpecificLesson>

export const SpecificLessonEditorContext = createContext<SpecificLessonEditorContextType | null>(null)

export const useSpecificLessonEditorContext = () => useContext(SpecificLessonEditorContext)!

export type HomeworkEditorContextType = EditorContextType<IDetailedHomework>

export const HomeworkEditorContext = createContext<HomeworkEditorContextType | null>(null)

export const useHomeworkEditorContext = () => useContext(HomeworkEditorContext)!