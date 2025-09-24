'use client'

import { ISocial } from "@/interfaces"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { useCallback } from "react"
import { Instagram, Facebook, QuestionMark, Close, Add } from "@mui/icons-material"
import { useTranslations } from "next-intl"
import { useSocialsEditor } from "@/hooks"

interface SocialsProps {
  socials: ISocial[]
  setSocials: (socials: ISocial[]) => void
}

export function Socials({socials, setSocials}: SocialsProps) {
  const {social, setSocial, updateSocial, deleteSocial, addSocial, isUnique} = useSocialsEditor(socials, setSocials)
  const t = useTranslations('profile')
  

  const getIcon = useCallback((type: ISocial['type']) => {
    switch (type) {
      case 'fb': return <Facebook color='primary' />
      case 'ig': return <Instagram color='primary' />
      default: return <QuestionMark color='primary' />
    }
  }, [])

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