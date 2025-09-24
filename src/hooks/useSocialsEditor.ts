'use client'

import { ISocial } from "@/interfaces"
import { useCallback, useEffect, useMemo, useState } from "react"

const dummySocial = {
  id: '',
  type: 'un' as const,
  link: ''
}

export function useSocialsEditor(socials: ISocial[], setSocials: (socials: ISocial[]) => void) {
  const [social, setSocial] = useState<ISocial>(dummySocial)

  const getSocialType = useCallback((link: string) => {
    if (link.startsWith('https://www.instagram.com/')) {
      return 'ig'
    } else if (link.startsWith('https://www.facebook.com/')) {
      return 'fb'
    }
    return 'un'
  }, [])

  useEffect(() => {
    setSocial(s => ({...s, type: getSocialType(social.link)}))
  }, [getSocialType, social.link])

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

  const isUnique = useMemo(() => {
    return !socials.map(s => s.type).includes(social.type)
  }, [social, socials])

  return {
    social,
    setSocial,
    updateSocial,
    deleteSocial,
    addSocial,
    isUnique
  }
}