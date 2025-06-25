'use client'

import { IMedia } from '@/utils/interfaces'
import { Stack, TextField } from '@mui/material'
import { useTranslations } from 'next-intl'
import { ImageUploader, SchoolPositionsEditor } from '@/components'
import Image from 'next/image'
import { deleteSchoolPreview, sendSchoolPreview } from '@/utils/api'
import { Contacts } from './contacts'
import { Photos } from './photos'
import { useSchoolEditorContext } from '@/providers'

export default function Container() {
  const { instance: school, setInstance: setSchool } = useSchoolEditorContext()
  const t = useTranslations('schools.details');

  return <>
    <Stack direction='row' gap={4}>
      <Stack sx={{flex: 1, alignItems: 'flex-start'}} direction='row'>
        <ImageUploader<IMedia>
          existing={school.preview}
          setExisting={val => setSchool(s => ({ ...s, preview: val }))}
          sendFile={formData => sendSchoolPreview(school.id, formData)}
          deleteFile={() => deleteSchoolPreview(school.id)}
          renderImage={src => <Image
            width={1792}
            height={1024}
            src={src ?? '/images/default-school.png'}
            alt='school-preview'
            style={{width: '100%', height: 'auto'}}
            priority
          />}
        />
      </Stack>
      <Stack gap={2} sx={{flex: 1, justifyContent: 'space-between'}}>
        <TextField label={t('name')} value={school.name} onChange={(e) => setSchool({...school, name: e.target.value})} />
        <TextField label={t('desc')} value={school.desc} multiline rows={10} onChange={(e) => setSchool({...school, desc: e.target.value})} />
      </Stack>
    </Stack>
    <Contacts school={school} setSchool={setSchool} />
    <SchoolPositionsEditor school={school} setSchool={setSchool} />
    <Photos school={school} setSchool={setSchool} />
  </>
}