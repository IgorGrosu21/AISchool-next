import type { IMedia } from '../media'
import type { IUserName } from '../name'

export type IUser = IUserName & {
  avatar?: IMedia
  isVerified: boolean
}

export type ISocial = {
  id: string
  type: 'un' | 'ig' | 'fb'
  link: string
}