'use client'

import { IMedia } from '@/interfaces'
import { Stack, TextField } from '@mui/material'
import { useTranslations } from 'next-intl'
import { ImageUploader, SchoolPositionsEditor, PhotosEditor, ContactsEditor, ClientPanel } from '@/components'
import Image from 'next/image'
import { editSchoolPreview, removeSchoolPreview } from '@/app/actions'
import { useSchoolEditorContext } from '@/providers'
import { useCallback } from 'react'

export function Editor() {
  const { instance: school, setInstance: setSchool } = useSchoolEditorContext()
  const t = useTranslations('schools.details');
  
  const updatePreview = useCallback((val: string | undefined) => {
    setSchool(s => { 
      let files = s.files
      if (val) {
        if (s.preview) {
          files = files.map(f => f.file === s.preview ? {...f, file: val} : f)
        } else {
          files = [...files, {file: val, id: ''}]
        }
      } else {
        files = files.filter(f => f.file !== s.preview)
      }
      return {
        ...s,
        preview: val,
        files
      }
    })
  }, [setSchool])

  return <>
    <Stack direction='column' gap={4}>
      <Stack sx={{flex: 1, alignItems: 'flex-start'}} direction='row'>
        <ImageUploader<IMedia>
          existing={school.preview}
          setExisting={updatePreview}
          sendFile={formData => editSchoolPreview(school, formData)}
          deleteFile={() => removeSchoolPreview(school)}
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
      <ClientPanel gap={2} sx={{flex: 1, justifyContent: 'space-between'}}>
        <TextField label={t('name')} value={school.name} onChange={(e) => setSchool({...school, name: e.target.value})} />
        <TextField label={t('desc')} value={school.desc} multiline rows={10} onChange={(e) => setSchool({...school, desc: e.target.value})} />
      </ClientPanel>
    </Stack>
    <ContactsEditor school={school} setSchool={setSchool} />
    <SchoolPositionsEditor school={school} setSchool={setSchool} />
    <PhotosEditor school={school} setSchool={setSchool} />
  </>
}