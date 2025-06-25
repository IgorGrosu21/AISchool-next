'use client'

import { Context, ProviderProps, useCallback, useMemo, useState, useTransition } from "react"

import { useTranslations } from "next-intl";
import { Loader } from "@/components";
import { ArrowBack } from "@mui/icons-material";
import { Stack, Divider, Button, Typography } from "@mui/material";
import Link from "next/link";
import { EditorContextType } from "./contexts";

interface EditorProviderValue<T> {
  Context: Context<EditorContextType<T> | null>
  initial: T
  action: (instance: T) => Promise<T>
  segments: Array<{ label: string, href: string }>
}

export function EditorProvider<T>({children, value: {Context, initial, action, segments}}: ProviderProps<EditorProviderValue<T>>) {
  const t = useTranslations('components.edit');
  const returnLink = useMemo(() => '/core/' + segments.at(-1)?.href, [segments])
  const returnLabel = useMemo(() => segments.at(-1)?.label, [segments])

  const [instance, setInstance] = useState<T>(initial)
  const [pending, startTransition] = useTransition()

  const discard = useCallback(() => {
    setInstance(initial)
  }, [initial])

  const save = useCallback(() => {
    startTransition(async () => {
      const updatedInstance = await action(instance)
      setInstance({...updatedInstance})
    })
  }, [action, instance])

  return <Context.Provider value={{instance, setInstance}}>
    {returnLabel !== '' && <Link href={returnLink}>
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <ArrowBack />
        <Typography variant='h5'>{returnLabel}</Typography>
      </Stack>
    </Link>}
    {children}
    <Divider />
    <Stack direction='row' sx={{justifyContent: 'space-between'}}>
      <Link href={returnLink}>
        <Button variant='outlined'>{t('return')}</Button>
      </Link>
      <Stack gap={2} direction='row' sx={{justifyContent: 'flex-end'}}>
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Stack>
    </Stack>
    <Loader open={pending} />
  </Context.Provider>
}