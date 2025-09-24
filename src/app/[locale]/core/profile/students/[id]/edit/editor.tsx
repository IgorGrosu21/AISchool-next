'use client'

import { IKlass, ISchoolName } from "@/interfaces";
import { PickSchool, ProfileContainer as StudentContainer, PickKlass, ClientPanel } from "@/components";
import { useStudentEditorContext } from "@/providers";
import { useMemo } from "react";

interface ContainerProps {
  schoolNames: ISchoolName[]
}

export function Editor({schoolNames}: ContainerProps) {
  const { instance: student, setInstance: setStudent } = useStudentEditorContext()

  const dummyKlass: IKlass = useMemo(() => ({
    id: '',
    grade: student.klass?.grade ?? 12,
    letter: student.klass?.letter ?? 'A',
    profile: 'R' as const,
    school: student.klass?.school ?? {
      id: '',
      name: '',
      city: { id: '', name: '' },
      slug: '',
    },
    slug: '12А',
    networth: 0
  }), [student.klass])

  return <StudentContainer user={student.user} setUser={user => setStudent(s => ({...s, user}))}>
    <ClientPanel>
      <PickSchool value={student.klass?.school ?? null} setValue={v => setStudent(
        s => ({...s, klass: s.klass ? {...s.klass, school: v} : {...dummyKlass, school: v}})
      )} options={schoolNames} />
    </ClientPanel>
    <ClientPanel>
      <PickKlass klass={dummyKlass} setKlass={klass => setStudent(s => ({...s, klass: {...dummyKlass, grade: klass.grade, letter: klass.letter}}))} />
    </ClientPanel>
  </StudentContainer>
}
