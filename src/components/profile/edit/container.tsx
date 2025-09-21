'use client'

import { IDetailedUser } from "@/utils/interfaces";
import { Stack } from "@mui/material";
import { Fields } from "./fields";
import { Socials } from "./socials";
import { ImageUploader } from "../../imageUploader";
import Image from "next/image";
import { removeAvatar, editAvatar } from "@/app/actions/user";
import { ClientPanel } from "@/components";

interface ContainerProps {
  user: IDetailedUser
  setUser: (user: IDetailedUser) => void
  children: React.ReactNode | React.ReactNode[]
}

export function ProfileContainer({user, setUser, children}: ContainerProps) {
  return <>
    <Stack gap={4} direction={{ xs: 'column', md: 'row' }}>
      <ClientPanel sx={{flexGrow: 0, height: '100%', alignItems: 'center'}}>
        <ImageUploader
          existing={user.avatar}
          setExisting={val => setUser({...user, avatar: val})}
          sendFile={editAvatar}
          deleteFile={removeAvatar}
          renderImage={(src) => <Stack sx={{
            border: 1,
            borderColor: 'primary.main',
            borderRadius: '50%',
            width: { xs: 150, md: 200 },
            height: { xs: 150, md: 200 },
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: { xs: 'center', md: 'flex-start' }
          }}>
            <Image 
              src={src ?? '/images/default-avatar.png'} 
              width={200} 
              height={200} 
              style={{
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} 
              alt='avatar' 
              priority 
            />
          </Stack>}
        />
      </ClientPanel>
      <Fields user={user} setUser={setUser} />
    </Stack>
    <Stack gap={{ xs: 6, md: 8 }}>
      <ClientPanel>
        <Socials socials={user.socials} setSocials={socials => setUser({...user, socials})} />
      </ClientPanel>
      {children}
    </Stack>
  </>
}
