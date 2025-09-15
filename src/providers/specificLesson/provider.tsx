'use client'

import { Dispatch, ProviderProps, SetStateAction } from "react";
import { IDetailedMedia } from "@/utils/interfaces";
import { AttachedFilesProvider } from "./files/provider";
import { AttachedLinksProvider } from "./links/provider";

type Instance = {
  links: string
  files: IDetailedMedia[]
  filesData?: File[]
}

interface ValueType<T> {
  setInstance: Dispatch<SetStateAction<T>>
}

export function AttachedItemsProvider<T extends Instance>({children, value: {setInstance}}: ProviderProps<ValueType<T>>) {
  return <AttachedLinksProvider value={{ setInstance: setInstance }}>
    <AttachedFilesProvider value={{ setInstance: setInstance }}>
      {children}
    </AttachedFilesProvider>
  </AttachedLinksProvider>
}