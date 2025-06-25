'use client'

import { IDetailedStudent, IDetailedTeacher } from "@/utils/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type StudentEditorContextType = EditorContextType<IDetailedStudent>

export const StudentEditorContext = createContext<StudentEditorContextType | null>(null)

export const useStudentEditorContext = () => useContext(StudentEditorContext)!

export type TeacherEditorContextType = EditorContextType<IDetailedTeacher>

export const TeacherEditorContext = createContext<TeacherEditorContextType | null>(null)

export const useTeacherEditorContext = () => useContext(TeacherEditorContext)!