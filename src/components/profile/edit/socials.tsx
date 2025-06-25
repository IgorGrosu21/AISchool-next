'use client'

import { ISocial } from "@/utils/interfaces"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Instagram, Facebook, QuestionMark, Close, Add } from "@mui/icons-material"
import { useTranslations } from "next-intl"

const dummySocial = {
    id: '',
    type: 'un' as const,
    link: ''
  }

interface SocialsProps {
  socials: ISocial[]
  setSocials: (socials: ISocial[]) => void
}

export function Socials({socials, setSocials}: SocialsProps) {
  const [social, setSocial] = useState<ISocial>(dummySocial)
  const t = useTranslations('profile')

  const getSocialType = useCallback((link: string) => {
    if (link.startsWith('https://www.instagram.com/')) {
      return 'ig'
    } else if (link.startsWith('https://www.facebook.com/')) {
      return 'fb'
    }
    return 'un'
  }, [])

  const updateSocial = useCallback((i: number, link: string) => {
    const type = getSocialType(link)
    setSocials(socials.map((s, k) => k === i ? s : { ...s, link, type }))
  }, [getSocialType, setSocials, socials])

  const deleteSocial = useCallback((i: number) => {
    setSocials(socials.filter((_, k) => k != i))
  }, [setSocials, socials])

  const addSocial = useCallback(() => {
    setSocials([...socials, social])
    setSocial(dummySocial)
  }, [setSocials, social, socials])

  useEffect(() => {
    setSocial(s => ({...s, type: getSocialType(social.link)}))
  }, [getSocialType, social.link])

  const getIcon = useCallback((type: ISocial['type']) => {
    switch (type) {
      case 'fb': return <Facebook color='primary' />
      case 'ig': return <Instagram color='primary' />
      default: return <QuestionMark color='primary' />
    }
  }, [])

  const isUnique = useMemo(() => {
    return !socials.map(s => s.type).includes(social.type)
  }, [social, socials])

  return <Stack gap={2}>
    <Typography variant='h6'>{t('pick_socials')}</Typography>
    <Stack gap={2}>
      {socials.map((s, i) => <Stack key={i} direction='row' gap={2} sx={{alignItems: 'center'}}>
        {getIcon(s.type)}
        <TextField value={s.link} error={s.type === 'un'} onChange={(e) => updateSocial(i, e.target.value)} sx={{flex: 1}} />
        <Close color='primary' onClick={() => deleteSocial(i)} />
      </Stack>)}
      <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        {getIcon(social.type)}
        <TextField
          value={social.link}
          error={social.type === 'un' && social.link != ''}
          onChange={(e) => setSocial(s => ({...s, link: e.target.value}))}
          sx={{flex: 1}}
        />
        <Add color='primary' onClick={addSocial} />
        <Button variant='contained' disabled={social.type === 'un' || !isUnique} onClick={addSocial}>{t('add')}</Button>
      </Stack>
    </Stack>
  </Stack>
}