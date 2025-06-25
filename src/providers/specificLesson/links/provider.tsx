'use client'

import { Dispatch, ProviderProps, SetStateAction, useCallback, useState } from "react";
import { LinksContext } from "./context";
import { Backdrop, Stack, TextField, Button, Box } from "@mui/material";
import { useTranslations } from "next-intl";

interface ValueType<T> {
  setInstance: Dispatch<SetStateAction<T>>
}

export function SpecificLessonLinksProvider<T extends {links: string}>({children, value: {setInstance}}: ProviderProps<ValueType<T>>) {
  const [newLink, setNewLink] = useState('')
  const [linksOpened, openLinks] = useState(false)
  const t = useTranslations('timetable.specific_lessons.links')

  const closeLinks = useCallback((addLink = false) => {
    if (newLink !== '' && addLink) {
      setInstance(instance => ({...instance, links: instance.links === '' ? newLink : [...instance.links.split('|'), newLink].join('|')}))
    }
    setNewLink('')
    openLinks(false)
  }, [newLink, setInstance])

  const editLink = useCallback((link: string, i: number) => {
    setInstance(instance => ({...instance, links: instance.links.split('|').map((l, j) => j === i ? link : l).join('|')}))
  }, [setInstance])
  
  const deleteLink = useCallback((i: number) => {
    setInstance(instance => ({...instance, links: instance.links.split('|').filter((_, j) => j !== i).join('|')}))
  }, [setInstance])

  return <LinksContext value={{
    openLinks: () => openLinks(true),
    editLink,
    deleteLink
  }}>
    {children}
    <Backdrop sx={{ zIndex: 1300 }} open={linksOpened}>
      <Stack gap={2} sx={{width: '60vw', bgcolor: 'background.default', p: 4}}>
        <TextField label={t('singular')} value={newLink} onChange={e => setNewLink(e.target.value)} />
        <Stack direction='row' gap={2}>
          <Button variant='outlined' onClick={() => closeLinks()}>{t('close')}</Button>
          <Box sx={{flex: 1}} />
          <Button variant='outlined' onClick={() => closeLinks()}>{t('discard')}</Button>
          <Button variant='contained' onClick={() => closeLinks(true)}>{t('add')}</Button>
        </Stack>
      </Stack>
    </Backdrop>
  </LinksContext>
}