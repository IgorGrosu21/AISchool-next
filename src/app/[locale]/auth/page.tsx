'use client'

import { auth } from "@/app/actions/auth";
import { AuthButton, Loader } from "@/components";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { Login } from "./login";
import { Signup } from "./signup";
import { Input } from "./(util)";

export default function Page() {
  const t = useTranslations('auth');
  const [type, setType] = useState<'login' | 'signup'>('login')
  const [state, action, pending] = useActionState(auth, {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  })

  const switchType = useCallback(() => {
    setType(t => t === 'login' ? 'signup' : 'login')
  }, [])
  
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.animate([
        { opacity: '0' },
        { opacity: '1' }
      ], 500)
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.opacity = '1'
        }
      }, 480)
    }
  }, [type])
  
  return <Stack component='form' action={action} gap={4} sx={{width: type === 'login' ? '20vw' : '40vw', transition: '0.5s'}}>
    <Typography textAlign='center' variant='h4' color='primary'>{t(`${type}.label`)}</Typography>
    <Button onClick={switchType}>
      <Typography textAlign='center' color='primary'>{t(`${type}.link`)}</Typography>
    </Button>
    <Stack ref={ref} gap={2} direction={type === 'login' ? 'column' : 'row'} sx={{height: '22.5vh', justifyContent: 'space-evenly', transition: '0.5s'}}>
      {type === 'login' ? <Login state={state} /> : <Signup state={state} />}
      <Input hidden name='type' value={type} />
    </Stack>
    <Divider />
    <Stack gap={2}>
      <AuthButton type={type} variant='h6' />
      <Button sx={{borderRadius: 90, p: 1, bgcolor: 'transparent', color: '#000'}} variant='contained'>
        <Typography>{t('alternatives')}</Typography>
      </Button>
    </Stack>
    <Loader open={pending} />
  </Stack>
}