'use client'

import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Close, Restore, Upload, Visibility } from "@mui/icons-material";
import { useSpecificLessonFilesContext } from "@/providers";
import { IDetailedMedia } from "@/utils/interfaces";

interface SpecificLessonFilesProps {
  files: IDetailedMedia[]
  filesData?: File[]
  small?: boolean
}

export function SpecificLessonFiles({files, filesData, small = true}: SpecificLessonFilesProps) {
  const { openFilePicker, setActiveFile, setActiveFileData, restoreFile, deleteFile } = useSpecificLessonFilesContext()
  const t = useTranslations('timetable.specific_lessons')
  
  return <Stack gap={2}>
    <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
      <Typography variant={small ? 'h6' : 'h5'}>{t('files.plural')}:</Typography>
      <Upload onClick={openFilePicker} color='primary' />
    </Stack>
    <Stack direction='row' gap={2}>
      {files.map((file, i) => <Button key={i} variant='outlined' color={file.delete ? 'secondary' : 'primary'} sx={{gap: 2, p: 2}}>
        <Typography>{file.file.split('/').at(-1)}</Typography>
        <Visibility onClick={() => setActiveFile(file)} />
        {file.delete ? <Restore onClick={() => restoreFile(i)} /> : <Close onClick={() => deleteFile(i, 'file')} />}
      </Button>)}
      {filesData && filesData.map((file, i) => <Button key={i} variant='outlined' sx={{gap: 2, p: 2}}>
        <Typography>{file.name}</Typography>
        <Visibility onClick={() => setActiveFileData(file)} />
        <Close onClick={() => deleteFile(i, 'fileData')} />
      </Button>)}
    </Stack>
  </Stack>
}