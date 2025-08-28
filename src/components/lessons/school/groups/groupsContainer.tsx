'use client'

import { ISchoolWithTimetable } from "@/utils/interfaces"
import { WithKlass } from "./withKlass"
import { Dispatch, SetStateAction } from "react"
import { Groups } from "../../groups"
import { GroupsEditor } from "../../groupsEditor"

interface GroupsContainerProps {
  school: ISchoolWithTimetable
  setSchool?: Dispatch<SetStateAction<ISchoolWithTimetable>>
}

export function GroupsContainer({school, setSchool}: GroupsContainerProps) {
  return <WithKlass school={school} render={klass => {
    if (setSchool) {
      return <GroupsEditor allSubjects={school.subjects} staff={school.staff} klass={klass} updateGroups={groups => setSchool(
        s => ({...s, klasses: s.klasses.map(k => k.id === klass.id ? {...k, groups: groups} : k)})
      )} />
    }
    return <Groups klass={klass} />
  }} />
}