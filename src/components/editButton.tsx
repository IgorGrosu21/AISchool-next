'use server'

import { ICanEdit } from "@/utils/interfaces";
import { Button, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface EditButtonProps<T> {
  link: string
  editable: T
}

export async function EditButton<T extends ICanEdit>({link, editable}: EditButtonProps<T>) {
  const t = await getTranslations('components.edit');
  
  return editable.canEdit ? <Link href={`${link}/edit`}>
    <Button variant='contained'>
      <Typography>{t('edit')}</Typography>
    </Button>
  </Link> : <></>
}