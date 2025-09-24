'use client'

import { IDetailedKlass, IDetailedSchool, ISchoolWithKlasses, ISchoolWithTimetable } from "@/interfaces"
import { createContext, useContext } from "react"
import { EditorContextType } from "./base"

export type KlassEditorContextType = EditorContextType<IDetailedKlass>

export const KlassEditorContext = createContext<KlassEditorContextType | null>(null)

export const useKlassEditorContext = () => useContext(KlassEditorContext)!

export type SchoolEditorContextType = EditorContextType<IDetailedSchool>

export const SchoolEditorContext = createContext<SchoolEditorContextType | null>(null)

export const useSchoolEditorContext = () => useContext(SchoolEditorContext)!

export type SchoolWithKlassesEditorContextType = EditorContextType<ISchoolWithKlasses>

export const SchoolWithKlassesEditorContext = createContext<SchoolWithKlassesEditorContextType | null>(null)

export const useSchoolWithKlassesEditorContext = () => useContext(SchoolWithKlassesEditorContext)!

export type SchoolWithTimetableEditorContextType = EditorContextType<ISchoolWithTimetable>

export const SchoolWithTimetableEditorContext = createContext<SchoolWithTimetableEditorContextType | null>(null)

export const useSchoolWithTimetableEditorContext = () => useContext(SchoolWithTimetableEditorContext)!