'use client'

import { AnimationGroup2, AnimationGroup3 } from '@/ui'
import { PlusesSection } from './plusesSection'

export function Pluses() {
  return <>
    <PlusesSection userType='student' />
    <PlusesSection userType='student' animationGroup={<AnimationGroup2 />} />
    <PlusesSection userType='teacher' />
    <PlusesSection userType='teacher' animationGroup={<AnimationGroup3 />} />
    <PlusesSection userType='parent' />
  </>
}