'use server'

import { ICanEdit } from "@/utils/interfaces";
import { Fab } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Link from "next/link";

interface EditButtonProps<T> {
  link: string
  editable: T
}

export async function EditButton<T extends ICanEdit>({link, editable}: EditButtonProps<T>) {
  return editable.canEdit ? <Link href={`${link}/edit`}>
    <Fab 
      color='primary'
      size='medium'
      sx={{
        width: { xs: 48, md: 56 },
        height: { xs: 48, md: 56 },
        '& .MuiSvgIcon-root': {
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }
      }}
    >
      <Edit />
    </Fab>
  </Link> : <></>
}