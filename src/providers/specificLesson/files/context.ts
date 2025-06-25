'use client'

import { IDetailedMedia } from "@/utils/interfaces"
import { createContext, Dispatch, SetStateAction, useContext } from "react"

type FileContextType = {
  openFilePicker: () => void
  setActiveFile: Dispatch<SetStateAction<IDetailedMedia | undefined>>
  setActiveFileData: Dispatch<SetStateAction<File | undefined>>
  restoreFile: (i: number) => void
  deleteFile: (i: number, type: 'file' | 'fileData') => void
}

export const FilesContext = createContext<FileContextType>({
  openFilePicker: () => {},
  setActiveFile: () => {},
  setActiveFileData: () => {},
  restoreFile: () => {},
  deleteFile: () => {}
});

export const useSpecificLessonFilesContext = () => useContext(FilesContext)