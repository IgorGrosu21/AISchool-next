'use client'

import { IDetailedTopic, ITheory } from "@/utils/interfaces"
import { Button, Stack, Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { useTransition, useCallback, useMemo } from "react"
import { Loader } from "@/components/loader"
import { useRouter } from "next/navigation"

interface TheoryButtonsProps {
  topic: IDetailedTopic
  theory: ITheory
}

export function TheoryButtons({topic, theory}: TheoryButtonsProps) {
  const theoryIndex = topic.theories.findIndex(t => t.slug === theory.slug)
  const [prevTheory, nextTheory] = useMemo(() => {
    return theoryIndex === -1 ? [undefined, undefined] : [topic.theories[theoryIndex - 1], topic.theories[theoryIndex + 1]]
  }, [theoryIndex, topic.theories])
  const nextTask = useMemo(() => {
    return theoryIndex === -1 && nextTheory === undefined && topic.tasks.length > 0 ? undefined : topic.tasks[0]
  }, [nextTheory, theoryIndex, topic.tasks])

  const baseHref = useMemo(() => `/core/manuals/${topic.module.manual.slug}/${topic.module.slug}/${topic.slug}/`, [topic])
  const [pending, startTransition] = useTransition()
  const t = useTranslations('manuals')
  const router = useRouter()
  
  const previous = useCallback(() => {
    if (prevTheory) {
      startTransition(async () => {
        router.push(`${baseHref}/theories/${prevTheory.slug}`);
      })
    }
  }, [baseHref, prevTheory, router])
  
  const complete = useCallback(() => {
    startTransition(async () => {
      if (nextTheory) {
        router.push(`${baseHref}/theories/${nextTheory.slug}`)
      } else if (nextTask) {
        router.push(`${baseHref}/tasks/${nextTask.slug}`)
      } else {
        router.push(baseHref);
      }
    })
  }, [baseHref, nextTask, nextTheory, router])

  return <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
    <Button variant='contained' onClick={previous} disabled={prevTheory === undefined}>
      <Typography>{t('prev_theory')}</Typography>
    </Button>
    <Button variant='contained' onClick={complete}>
      <Typography>{t(nextTheory ? 'next_theory' : (nextTask ? 'next_task' : 'complete'))}</Typography>
    </Button>
    <Loader open={pending} />
  </Stack>
}