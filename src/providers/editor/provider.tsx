'use client'

import { Context, ProviderProps, useCallback, useMemo, useState, useTransition } from "react"

import { useTranslations } from "next-intl";
import { ClientPanel, Loader, Title } from "@/components";
import { Stack, Button } from "@mui/material";
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
  const returnLabel = useMemo(() => '' + segments.at(-1)?.label, [segments])

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
    {returnLabel !== '' && <Title label={returnLabel} link={returnLink} type='back' />}
    {children}
    <ClientPanel direction='row' sx={{justifyContent: 'space-between'}}>
      <Link href={returnLink}>
        <Button variant='outlined'>{t('return')}</Button>
      </Link>
      <Stack gap={2} direction='row' sx={{justifyContent: 'flex-end'}}>
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Stack>
    </ClientPanel>
    <Loader open={pending} />
  </Context.Provider>
}