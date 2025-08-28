import { IDetailedSchool } from "@/utils/interfaces";
import { Stack, ImageList, ImageListItem } from "@mui/material";
import Image from 'next/image';

interface PhotosProps {
  school: IDetailedSchool
}

export async function Photos({school}: PhotosProps) {
  return <Stack sx={{alignItems: 'center'}}>
    <ImageList sx={{ width: '75%', height: 'auto' }} cols={2}>
      {school.files.map((photo, i) => <ImageListItem key={i}>
        <Image
          width={1792}
          height={1024}
          src={photo.file}
          alt={`School photo #${i + 1}`}
          loading='lazy'
          style={{width: '100%', height: 'auto'}}
        />
      </ImageListItem>)}
    </ImageList>
  </Stack>
}