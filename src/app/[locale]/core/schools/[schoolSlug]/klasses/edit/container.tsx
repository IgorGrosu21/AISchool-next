'use client'

import { useSchoolWithKlassesEditorContext } from '@/providers'
import { useCallback, useEffect, useMemo } from 'react'
import { Button, Grid2, Stack, Typography } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { IKlassName } from '@/utils/interfaces'

const letters = ['A', 'B', 'C', 'D', 'E']
const grades = Array.from({length: 12}, (_, i) => i + 1)

export default function Container() {
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

  const getNextLetter = useCallback((i: number) => {
    const klasses = grouped[i].klasses
    for (const letter of letters) {
      if (klasses.findIndex(k => k.letter === letter) === -1) {
        return letter
      }
    }
    return ''
  }, [grouped])

  return <Grid2 container spacing={8} columns={2}>
    {grouped.map((group, i) => <Grid2 size={1} key={group.grade}>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        {group.klasses.map((klass, j) => <Button variant='contained' key={j} sx={{
          borderRadius: '15%',
          width: 75,
          aspectRatio: 1,
          justifyContent: 'center',
          transition: '0.5s',
          [':hover']: {
            opacity: 0.2,
            ['& svg']: {
              opacity: 1
            }
          }
        }} onClick={() => setSchool(s => ({...s, klasses: s.klasses.filter(k => !(k.grade === group.grade && k.letter === klass.letter))}))}>
          <Typography variant='h6' sx={{color: 'primary.contrastText', textAlign: 'center'}}>{klass.grade}{klass.letter}</Typography>
          <RemoveCircle fontSize='large' sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: '0.5s'
          }} />
        </Button>)}
        <Button variant='contained' disabled={group.klasses.length >= 5} sx={{
          display: 'flex',
          borderRadius: '15%',
          width: 75,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} onClick={() => {
            const letter = getNextLetter(i)
            setSchool(s => ({
              ...s,
              klasses: [...s.klasses, {id: '', grade: group.grade, letter: letter, profile: letter === 'A' ? 'R' : 'U', school: school.slug, slug: `${group.grade}${letter}`}]
            }))
          }}>
          <AddCircle fontSize='large' sx={{color: 'primary.contrastText'}} />
        </Button>
      </Stack>
    </Grid2>)}
  </Grid2>
}