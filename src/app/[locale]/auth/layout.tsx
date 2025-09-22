import { Stack } from "@mui/material";
import { redirect } from "next/navigation"
import Image from "next/image";
import { isLoggedIn } from "@/app/actions/token";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const loggedIn = await isLoggedIn()
  
  if (loggedIn) {
    redirect('/core')
  }

  return <Stack 
    gap={2} 
    sx={{
      alignItems: 'center', 
      minHeight: '100vh',
      width: '100%', 
      px: { xs: 2, md: 2 },
      justifyContent: 'center'
    }}
  >
    <Image 
      src='/images/logo-blue.png' 
      width={100} 
      height={94} 
      alt='light-logo' 
      priority 
      style={{ 
        marginBottom: '1rem',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
    {children}
  </Stack>
}