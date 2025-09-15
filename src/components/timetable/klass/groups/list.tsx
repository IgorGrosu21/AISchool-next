'use client'

import { IDetailedKlass } from "@/utils/interfaces"
import { Groups } from "../../groups";

interface KlassGroupsProps {
  klass: IDetailedKlass
}

export function KlassGroups({klass}: KlassGroupsProps) {
  return <Groups klass={{...klass, school: klass.school.id}} />
}