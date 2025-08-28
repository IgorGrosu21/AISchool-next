import { ImageUploader } from "@/components";
import { IDetailedMedia, IDetailedSchool } from "@/utils/interfaces";
import { Stack, ImageList, ImageListItem } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { deleteSchoolPhoto, sendSchoolPhoto } from "@/utils/api";
import { AddCircleOutline } from "@mui/icons-material";

interface PhotosProps {
  school: IDetailedSchool,
  setSchool: Dispatch<SetStateAction<IDetailedSchool>>
}

export function Photos({school, setSchool}: PhotosProps) {
  const [photos, setPhotos] = useState<Array<{
    id: string | null,
    file?: string
  }>>(school.files)

  useEffect(() => {
    const newPhotos = photos.filter(p => p.id !== null && p.file !== undefined) as IDetailedMedia[]
    setSchool(s => ({...s, photos: newPhotos}))
  }, [photos, setSchool])

  const addPhoto = useCallback(() => {
    setPhotos(ps => [...ps, { id: null }])
  }, [])

  const updatePhoto = useCallback((photo: {id: string | null, file?: string}, val?: IDetailedMedia) => {
    setPhotos(ps => val ? ps.map(p => p.id === photo.id ? {...val} : p) : ps.filter(p => p.id !== photo.id))
    if (photo.file === school.preview) {
      setSchool(s => ({...s, preview: val?.file}))
    }
  }, [school.preview, setSchool])

  const deletePhoto = useCallback(async (photo: {id: string | null, file?: string}) => {
    if (photo.id) {
      if (school.preview === photo.file) {
        setSchool(s => ({...s, preview: undefined}))
      }
      return deleteSchoolPhoto(school.slug, photo.id)
    }
    setPhotos(ps => ps.filter(p => p.id !== photo.id))
  }, [school.preview, school.slug, setSchool])

  return <Stack sx={{alignItems: 'center'}}>
    <ImageList sx={{ width: '75%', height: 'auto' }} cols={2}>
      {photos.map((photo, i) => <ImageListItem key={i}>
        <ImageUploader<IDetailedMedia>
          existing={photo.file}
          setExisting={val => updatePhoto(photo, val)}
          sendFile={formData => sendSchoolPhoto(school.slug, formData)}
          deleteFile={() => deletePhoto(photo)}
          renderImage={src => <Image
            width={1792}
            height={1024}
            src={src ?? '/images/default-school.png'}
            alt={`School photo #${i + 1}`}
            loading='lazy'
            style={{width: '100%', height: 'auto'}}
          />}
        />
      </ImageListItem>)}
      <ImageListItem sx={{alignItems: 'center', justifyContent: 'center'}}>
        <AddCircleOutline color='primary' sx={{fontSize: '3rem'}} onClick={addPhoto} />
      </ImageListItem>
    </ImageList>
  </Stack>
}