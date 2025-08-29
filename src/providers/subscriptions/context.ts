'use client'

import { createContext, Dispatch, SetStateAction, useContext } from "react"

export type SubscriptionsContextType = {
  type: 'solo' | 'group'
  setType: Dispatch<SetStateAction<'solo' | 'group'>>
}

export const SubscriptionsContext = createContext<SubscriptionsContextType | null>(null)

export const useSubscriptionsContext = () => useContext(SubscriptionsContext)!