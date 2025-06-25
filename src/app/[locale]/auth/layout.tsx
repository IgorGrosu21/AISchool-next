import { Stack } from "@mui/material";
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import Image from "next/image";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.get('refresh_token')?.value != undefined

  if (isLoggedIn) {
    redirect('/core')
  }

  return <Stack gap={2} sx={{alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', p: 2}}>
    <Image src='/images/logo-blue.png' width={100} height={94} alt='light-logo' priority />
    {children}
  </Stack>
}