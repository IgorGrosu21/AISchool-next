'use client'

import { useSchoolWithKlassesEditorContext } from '@/providers'
import { useCallback, useEffect, useMemo } from 'react'
import { IKlassName } from '@/utils/interfaces'

const letters = ['A', 'B', 'C', 'D', 'E']
const grades = Array.from({length: 12}, (_, i) => i + 1)

export function useKlassListEditor() {
  const { instance: school, setInstance: setSchool } = useSchoolWithKlassesEditorContext()

  useEffect(() => {
    const klasses: IKlassName[] = []
    grades.forEach(grade => {
      if (school.klasses.findIndex(k => k.grade === grade && k.letter === 'A') === -1) {
        klasses.push({id: '', grade: grade, letter: 'A' as const, profile: 'R' as const, school: school.slug, slug: `${grade}A`})
      }
    }, [])
    if (klasses.length > 0) {
      setSchool(s => ({...s, klasses: [...s.klasses, ...klasses]}))
    }
  }, [school.klasses, school.slug, setSchool])

  const grouped = useMemo(() => {
    const grouped = grades.map(grade => ({
      grade: grade,
      klasses: [] as IKlassName[]
    }))

    school.klasses.forEach(k => {
      const group = grouped.find(s1 => s1.grade === k.grade)
      if (group) {
        group.klasses.push(k)
        group.klasses.sort((a, b) => a.letter.localeCompare(b.letter))
      }
    })
    return grouped
  }, [school.klasses])

  const removeKlass = useCallback((i: number, klass: IKlassName) => {
    const group = grouped[i]
    setSchool(s => ({...s, klasses: s.klasses.filter(k => !(k.grade === group.grade && k.letter === klass.letter))}))
  }, [grouped, setSchool])

  const addKlass = useCallback((i: number) => {
    const group = grouped[i]
    const letter = letters[group.klasses.length]
    setSchool(s => ({
      ...s,
      klasses: [...s.klasses, {id: '', grade: group.grade, letter: letter, profile: letter === 'A' ? 'R' : 'U', school: school.slug, slug: `${group.grade}${letter}`}]
    }))
  }, [grouped, setSchool, school.slug])

  return {
    grouped,
    removeKlass,
    addKlass
  }
}