'use client'

import { ProviderProps, useState } from "react"

import { SubscriptionsContext } from "./context";

interface SubscriptionsProviderValue {
  type?: 'solo' | 'group'
}

export function SubscriptionsProvider({children, value}: ProviderProps<SubscriptionsProviderValue>) {
  const [type, setType] = useState<'solo' | 'group'>(value.type || 'solo')

  return <SubscriptionsContext.Provider value={{ type, setType }}>
    {children}
  </SubscriptionsContext.Provider>
}