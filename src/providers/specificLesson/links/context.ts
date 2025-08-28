'use client'

import { createContext, useContext } from "react"

type LinkContextType = {
  openLinks: () => void
  editLink: (link: string, i: number) => void
  deleteLink: (i: number) => void
}

export const LinksContext = createContext<LinkContextType>({
  openLinks: () => {},
  editLink: () => {},
  deleteLink: () => {},
});

export const useAttachedLinksContext = () => useContext(LinksContext)