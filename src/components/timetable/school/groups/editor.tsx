'use client'

import { ISchoolWithTimetable } from "@/utils/interfaces"
import { WithKlass } from "../withKlass"
import { Dispatch, SetStateAction } from "react"
import { GroupsEditor } from "../../groups"

interface GroupsEditorProps {
  school: ISchoolWithTimetable
  setSchool: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function SchoolGroupsEditor({school, setSchool}: GroupsEditorProps) {
  return <WithKlass school={school} render={klass => <GroupsEditor
    allSubjects={school.subjects}
    staff={school.staff}
    klass={klass}
    updateGroups={groups => setSchool(
      s => ({...s, klasses: s.klasses.map(k => k.id === klass.id ? {...k, groups: groups} : k)})
    )} />
  } />
}