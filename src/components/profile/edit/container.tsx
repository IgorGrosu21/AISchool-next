'use client'

import { IDetailedUser } from "@/utils/interfaces";
import { Stack, Divider } from "@mui/material";
import { Fields } from "./fields";
import { Socials } from "./socials";
import { ImageUploader } from "../../imageUploader";
import { deleteAvatar, sendAvatar } from "@/utils/api";
import Image from "next/image";

interface ContainerProps {
  user: IDetailedUser
  setUser: (user: IDetailedUser) => void
  children: React.ReactNode | React.ReactNode[]
}

export function ProfileContainer({user, setUser, children}: ContainerProps) {
  return <>
    <Stack gap={4} direction='row' sx={{justifyContent: 'space-between'}}>
      <ImageUploader
        existing={user.avatar}
        setExisting={val => setUser({...user, avatar: val})}
        sendFile={sendAvatar}
        deleteFile={deleteAvatar}
        renderImage={(src) => <Stack sx={{
          border: 1,
          borderColor: 'primary.main',
          borderRadius: '50%',
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image src={src ?? '/images/default-avatar.png'} width={200} height={200} style={{borderRadius: '50%'}} alt='avatar' priority />
        </Stack>}
      />
      <Divider orientation='vertical' flexItem />
      <Fields user={user} setUser={setUser} />
    </Stack>
    <Stack gap={8}>
      <Socials socials={user.socials} setSocials={socials => setUser({...user, socials})} />
      <Stack gap={4}>
        {children}
      </Stack>
    </Stack>
  </>
}
