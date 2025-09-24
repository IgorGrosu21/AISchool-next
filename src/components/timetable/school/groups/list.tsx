'use client'

import { ISchoolWithTimetable } from "@/interfaces"
import { WithKlass } from "../withKlass"
import { Groups } from "../../groups"

interface SchoolGroupsProps {
  school: ISchoolWithTimetable
}

export function SchoolGroups({school}: SchoolGroupsProps) {
  return <WithKlass school={school} render={klass => <Groups klass={klass} />} />
}