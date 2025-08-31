'use client'

import { auth } from "@/app/actions/auth";
import { AuthButton, Loader } from "@/components";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useActionState, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Login } from "./login";
import { Signup } from "./signup";
import { Input } from "./(util)";
import { useIsMobile } from "@/hooks";

export default function Page() {
  const t = useTranslations('auth');
  const [type, setType] = useState<'login' | 'signup'>('login')
  const [state, action, pending] = useActionState(auth, {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
  })
  const isMobile = useIsMobile();

  const switchType = useCallback(() => {
    setType(t => t === 'login' ? 'signup' : 'login')
  }, [])
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Stack 
        component='form' 
        action={action} 
        gap={4} 
        sx={{width: isMobile ? '90vw' : (type === 'login' ? '20vw' : '40vw'), transition: '0.5s'}}
      >
        <Typography textAlign='center' variant={isMobile ? 'h5' : 'h4'} color='primary'>
          {t(`${type}.label`)}
        </Typography>
        <Button onClick={switchType}>
          <Typography textAlign='center' color='primary'>{t(`${type}.link`)}</Typography>
        </Button>
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Stack 
              gap={2} 
              direction={isMobile ? 'column' : (type === 'login' ? 'column' : 'row')} 
              sx={{minHeight: '22.5vh', justifyContent: 'space-evenly', transition: '0.5s'}}
            >
              {type === 'login' ? <Login state={state} /> : <Signup state={state} />}
              <Input hidden name='type' value={type} />
            </Stack>
          </motion.div>
        </AnimatePresence>
        <Divider />
        <Stack gap={2}>
          <AuthButton type={type} variant='h6' />
          <Button sx={{borderRadius: 90, p: 1, bgcolor: 'transparent', color: '#000'}} variant='contained'>
            <Typography>{t('alternatives')}</Typography>
          </Button>
        </Stack>
        <Loader open={pending} />
      </Stack>
    </motion.div>
  )
}