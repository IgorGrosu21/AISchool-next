'use client'

import { IGroupName, IStudentName, ISubjectName, ITeacherName, IKlassNameWithGroups } from "@/interfaces"
import { useCallback, useMemo } from "react";

export function useGroupsEditor(klass: IKlassNameWithGroups, updateGroups: (groups: IGroupName[]) => void) {
  const groups = useMemo(() => klass.groups, [klass])

  const isSameGroup = useCallback((g1: IGroupName, g2: IGroupName) => {
    return g1.order === g2.order && g1.subject.id === g2.subject.id
  }, [])

  const updateContainer = useCallback((instance: {subjects: ISubjectName[]}) => {
    const groupsToDelete: IGroupName[] = []
    const groupsToAdd: IGroupName[] = []
    for (const subject of instance.subjects) {
      const group = groups.find(g => g.subject.id === subject.id)
      if (group === undefined) {
        groupsToAdd.push({
          id: '',
          order: 1,
          klass: klass.id,
          subject: subject,
          students: klass.students
        })
      }
    }
    for (const group of groups) {
      const subject = instance.subjects.find(s => s.id === group.subject.id)
      if (subject === undefined) {
        groupsToDelete.push(group)
      }
    }

    const newGroups: IGroupName[] = []
    for (const group of groups) {
      const toDelete = groupsToDelete.findIndex(g => g.subject.id === group.subject.id) > -1
      if (!toDelete) {
        newGroups.push(group)
      }
    }
    for (const group of groupsToAdd) {
      newGroups.push(group)
      newGroups.push({...group, order: 2, students: []})
    }
    updateGroups(newGroups)
  }, [groups, klass, updateGroups])

  const updateTeacher = useCallback((group: IGroupName, teacher: ITeacherName | null) => {
    updateGroups(groups.map(
      g => g.order === group.order && g.subject.id === group.subject.id ? {...g, teacher: teacher ?? undefined} : g
    ))
  }, [groups, updateGroups])

  const transferStudent = useCallback((student: IStudentName, oldGroup: IGroupName, newGroup?: IGroupName) => {
    if (newGroup === undefined) {
      return
    }
    updateGroups(groups.map(g => {
      if (isSameGroup(g, oldGroup)) {
        return {...g, students: g.students.filter(s => s.id !== student.id)}
      } else if (isSameGroup(g, newGroup)) {
        return {...g, students: [...g.students, student]}
      }
      return g
    }))
  }, [groups, isSameGroup, updateGroups])

  return { updateContainer, updateTeacher, transferStudent }
}