'use client'

import { ISubjectName } from "@/utils/interfaces"
import React from "react"
import { Subjects as SubjectList } from "@/components"

interface SubjectsProps {
  subjects: ISubjectName[]
}

export function Subjects({subjects}: SubjectsProps) {
  return <SubjectList subjects={subjects} />
}