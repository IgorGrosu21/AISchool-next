'use client'

import { Animation6, Animation7, Animation8, Animation9 } from '../animations'
import { PlusesSection } from './plusesSection'

export function Pluses() {
  return <>
    <PlusesSection userType='student' />
    <PlusesSection 
      userType='student'
      gradient
      animations={[
        <Animation6 key='animation6' />,
        <Animation7 key='animation7' />
      ]}
    />
    <PlusesSection userType='teacher' />
    <PlusesSection 
      userType='teacher'
      gradient
      animations={[
        <Animation8 key='animation8' />,
        <Animation9 key='animation9' />
      ]}
    />
    <PlusesSection userType='parent' />
  </>
}