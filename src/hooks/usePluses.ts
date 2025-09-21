'use client'

import { useTranslations } from "next-intl"
import { useMemo } from "react"

export function usePluses(userType: 'student' | 'teacher' | 'parent', paid: boolean) {
  const t = useTranslations('subscriptions')
  
  const pluses = useMemo(() => {
    let pluses: string = ''
    let indexes: number[] = [0, 1, 2, 3]
    if (userType === 'student') {
      pluses = paid ? t('pluses.solo') : t('free_pluses.student')
      if (paid) {
        indexes = [0, 1, 6, 9]
      }
    } else if (userType === 'teacher') {
      pluses = paid ? t('pluses.group') : t('free_pluses.teacher')
      if (paid) {
        indexes = [1, 3, 4, 5]
      }
    } else {
      pluses = t('free_pluses.parent')
    }
    return pluses.split(';').filter((_, i) => indexes.includes(i))
  }, [userType, paid, t])

  return pluses
}
