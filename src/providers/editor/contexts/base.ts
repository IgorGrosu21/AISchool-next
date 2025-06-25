import { Dispatch, SetStateAction } from "react"

export type EditorContextType<T> = {
  instance: T
  setInstance: Dispatch<SetStateAction<T>>
}