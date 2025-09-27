'use client'

import { Context, ProviderProps, useCallback, useMemo, useState, useTransition } from "react"

import { useTranslations } from "next-intl";
import { Loader, Title } from "@/components";
import { Panel } from "@/ui";
import { Stack, Button, Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { Link } from '@/i18n';
import { EditorContextType } from "./contexts";
import { ICanEdit } from "@/interfaces";
import { useRouter } from "@/i18n";

interface EditorProviderValue<T> {
  Context: Context<EditorContextType<T> | null>
  initial: T
  action: (instance: T) => Promise<[T | undefined, number]>
  segments: Array<{ label: string, href: string }>
}

export function EditorProvider<T extends ICanEdit>({children, value: {Context, initial, action, segments}}: ProviderProps<EditorProviderValue<T>>) {
  const t = useTranslations('components.edit');
  const returnLink = useMemo(() => '/core/' + segments.at(-1)?.href, [segments])
  const returnLabel = useMemo(() => '' + segments.at(-1)?.label, [segments])

  const [instance, setInstance] = useState<T>(initial)
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<number | undefined>(undefined)
  const router = useRouter()
  
  const handleClose = useCallback((e?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    e?.preventDefault()
    if (reason === 'clickaway') {
      return;
    }

    setStatus(undefined);
  }, [])

  const discard = useCallback(() => {
    setInstance(initial)
  }, [initial])

  const save = useCallback(() => {
    startTransition(async () => {
      const [updatedInstance, status] = await action(instance)
      if (updatedInstance && status === 200) {
        setStatus(status)
        setInstance({...updatedInstance})
      } else if (status === 401) {
        router.push('/unauthorized')
      } else {
        setStatus(status)
      }
    })
  }, [action, instance, router])
  
  if (!initial.canEdit) {
    router.push('/forbidden')
  }

  return <Context.Provider value={{instance, setInstance}}>
    {returnLabel !== '' && <Title label={returnLabel} link={returnLink} type='back' />}
    {children}
    <Panel direction='row' sx={{justifyContent: 'space-between'}}>
      <Link href={returnLink}>
        <Button variant='outlined'>{t('return')}</Button>
      </Link>
      <Stack gap={2} direction='row' sx={{justifyContent: 'flex-end'}}>
        <Button variant='outlined' onClick={discard}>{t('discard')}</Button>
        <Button variant='contained' onClick={save}>{t('save')}</Button>
      </Stack>
    </Panel>
    <Loader open={pending} />
    <Snackbar open={status !== undefined} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={status === 200 ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {status && t(status.toString())}
      </Alert>
    </Snackbar>
  </Context.Provider>
}