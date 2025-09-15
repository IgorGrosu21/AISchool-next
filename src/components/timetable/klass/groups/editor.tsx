'use client'

import { IDetailedKlass, IPositionName } from "@/utils/interfaces"
import { Dispatch, SetStateAction } from "react";
import { GroupsEditor } from "../../groups";

interface KlassGroupsEditorProps {
  staff: IPositionName[]
  klass: IDetailedKlass
  setKlass: Dispatch<SetStateAction<IDetailedKlass>>
}

export function KlassGroupsEditor({staff, klass, setKlass}: KlassGroupsEditorProps) {
  return <GroupsEditor
    allSubjects={klass.school.subjects}
    staff={staff}
    klass={{...klass, school: klass.school.id}}
    updateGroups={groups => setKlass(k => ({...k, groups: groups}))}
  />
}