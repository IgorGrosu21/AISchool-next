'use client'

import { useMemo } from 'react'
import { IDetailedKlass } from '@/interfaces'
import { Autocomplete, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { ClientPanel, KlassGroupsEditor, KlassLessonsEditor, StudentsEditor } from '@/components'
import { useTranslations } from 'next-intl'
import { useKlassEditorContext } from '@/providers'

export function Editor() {
  const { instance: klass, setInstance: setKlass } = useKlassEditorContext()
  const profiles = useMemo(() => ['R', 'U'], [])
  const t = useTranslations('klasses');
  const allTeachers = useMemo(() => klass.school.staff.filter(s => s.subjects.length > 0).map(s => s.teacher), [klass.school.staff])

  return <>
    <Stack gap={4}>
      <ClientPanel direction='row' gap={2} sx={{alignItems: 'center'}}>
        <Typography variant='h6'>{t(`profiles.title`)}:</Typography>
        <FormControl>
          <RadioGroup row value={klass.profile} onChange={e => setKlass({...klass, profile: e.target.value as IDetailedKlass['profile']})}>
            {profiles.map((profile, j) => 
              <FormControlLabel key={j} value={profile} control={<Radio />} label={t(`profiles.${profile}`)} />
            )}
          </RadioGroup>
        </FormControl>
      </ClientPanel>
      <ClientPanel>
        <Autocomplete
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={klass.teacher}
          onChange={(_, t) => t ? setKlass({...klass, teacher: {...t, user: {...t.user, isVerified: false}}}) : {}}
          options={allTeachers}
          getOptionLabel={(option) => `${option.user.surname} ${option.user.name}`}
          renderInput={(params) => <TextField {...params} label={t('teacher')} />}
        />
      </ClientPanel>
    </Stack>
    <StudentsEditor students={klass.students} setStudents={students => setKlass(k => ({...k, students: students}))} />
    <KlassLessonsEditor staff={klass.school.staff} timetable={klass.school.timetable} klass={klass} setKlass={setKlass} />
    <KlassGroupsEditor staff={klass.school.staff} klass={klass} setKlass={setKlass} />
  </>
}