'use client'

import { DeleteOutline, FileUpload } from '@mui/icons-material';
import { Stack, Button, Box } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader } from './loader';

interface ImageUploaderProps<T> {
  renderImage: (src?: string) => React.ReactNode,
  existing?: string
  setExisting: (val?: T) => void,
  sendFile: (formData: FormData) => Promise<T | undefined>
  deleteFile: () => Promise<undefined>
}

export function ImageUploader<T>({renderImage, existing, setExisting, sendFile, deleteFile}: ImageUploaderProps<T>) {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(existing);
  const [uploading, setUploading] = useState(false);
  const [hovering, setHovering] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('components.image_uploader');

  useEffect(() => {
    setPreview(existing)
  }, [existing])

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || undefined;
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
    }
  }, [setFile]);

  const upload = useCallback(() => {
    const formData = new FormData();
    formData.append('file', file!);

    setUploading(true);
    sendFile(formData).then(url => {
      if (url) {
        setExisting(url)
        setUploading(false)
      }
    })
  }, [file, sendFile, setExisting]);

  const onDelete = useCallback(() => {
    if (existing) {
      setUploading(true);
      deleteFile().then(() => {
        setExisting(undefined)
        setFile(undefined);
        setUploading(false)
      })
    } else if (fileInputRef.current) {
      fileInputRef.current.value = ''
      setPreview(undefined)
      setFile(undefined);
    }
  }, [deleteFile, existing, setExisting]);

  return <Stack gap={2} direction='row' sx={{alignItems: 'center'}}>
    <input ref={fileInputRef} type='file' accept='image/*' style={{display: 'none'}} onChange={onFileChange} />
    <Stack sx={{position: 'relative'}} onMouseOver={() => setHovering(true)} onMouseOut={() => setHovering(false)}>
      <Box sx={{opacity: hovering ? 0.3 : 1, transition: '0.5s'}}>
        {renderImage(preview ?? existing)}
      </Box>
      <Stack id='controls' gap={2} sx={{
        zIndex: 1300,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'white',
        opacity: hovering ? 0.7 : 0,
        transition: '0.5s'
      }}>
        <Button onClick={onDelete}>
          {t('delete')} <DeleteOutline />
        </Button>
        <Button onClick={openFilePicker}>
          {t('upload')} <FileUpload />
        </Button>
        <Button variant='contained' onClick={upload} disabled={file === undefined}>
          {t('save')}
        </Button>
      </Stack>
    </Stack>
    <Loader open={uploading} />
  </Stack>
}