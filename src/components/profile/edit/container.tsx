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
    <Stack 
      gap={{ xs: 4, md: 4 }} 
      direction={{ xs: 'column', md: 'row' }} 
      sx={{
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' }
      }}
    >
      <ImageUploader
        existing={user.avatar}
        setExisting={val => setUser({...user, avatar: val})}
        sendFile={sendAvatar}
        deleteFile={deleteAvatar}
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
      <Divider 
        orientation='vertical'
        flexItem 
        sx={{ 
          width: { xs: '100%', md: 'auto' },
          height: { xs: 'auto', md: '100%' },
          display: { xs: 'block', md: 'block' }
        }}
      />
      <Fields user={user} setUser={setUser} />
    </Stack>
    <Stack gap={{ xs: 6, md: 8 }}>
      <Socials socials={user.socials} setSocials={socials => setUser({...user, socials})} />
      <Stack gap={{ xs: 3, md: 4 }}>
        {children}
      </Stack>
    </Stack>
  </>
}
