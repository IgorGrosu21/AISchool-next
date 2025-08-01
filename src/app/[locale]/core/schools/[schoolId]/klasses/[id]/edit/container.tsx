'use client'

import { useMemo } from 'react'
import { IDetailedKlass } from '@/utils/interfaces'
import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { KlassLessonsEditor, StudentsEditor } from '@/components'
import { useTranslations } from 'next-intl'
import { useKlassEditorContext } from '@/providers'

export default function Container() {
  const { instance: klass, setInstance: setKlass } = useKlassEditorContext()
  const profiles = useMemo(() => ['R', 'U'], [])
  const t = useTranslations('klasses');
  const allTeachers = useMemo(() => klass.school.staff.filter(s => s.subjectNames.length > 0).map(s => s.teacher), [klass.school.staff])

  return <>
    <Stack gap={4}>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <Typography variant='h6'>{t(`profiles.title`)}:</Typography>
        <FormControl>
          <RadioGroup row value={klass.profile} onChange={e => setKlass({...klass, profile: e.target.value as IDetailedKlass['profile']})}>
            {profiles.map((profile, j) => 
              <FormControlLabel key={j} value={profile} control={<Radio />} label={t(`profiles.${profile}`)} />
            )}
          </RadioGroup>
        </FormControl>
      </Stack>
      <Autocomplete
        value={klass.teacher}
        onChange={(_, t) => t ? setKlass({...klass, teacher: {...t, user: {...t.user, isVerified: false}}}) : {}}
        options={allTeachers}
        getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
        renderInput={(params) => <TextField {...params} label={t('teacher')} />}
      />
    </Stack>
    <KlassLessonsEditor staff={klass.school.staff} timetable={klass.school.timetable} klass={klass} setKlass={setKlass} />
    <StudentsEditor students={klass.students} setStudents={students => setKlass(k => ({...k, students: students}))} />
  </>
}