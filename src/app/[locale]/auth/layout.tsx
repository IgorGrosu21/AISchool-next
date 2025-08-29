import { Stack } from "@mui/material";
import { redirect } from "next/navigation"
import Image from "next/image";
import { isLoggedIn } from "@/app/actions/token";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isLoggedIn()

  if (loggedIn) {
    redirect('/core')
  }

  return <Stack gap={2} sx={{alignItems: 'center', height: '100%', width: '100%', px: 2, pt: 16}}>
    <Image src='/images/logo-blue.png' width={100} height={94} alt='light-logo' priority />
    {children}
  </Stack>
}