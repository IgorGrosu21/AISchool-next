import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n';
import { Providers } from "./providers";
import { Stack } from "@mui/material";
import { Header, Footer } from "@/components";
import { AnimatedBackground } from "@/ui";
import { setRequestLocale } from "next-intl/server";
 
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  
  return <Providers>
    <AnimatedBackground />
    <Header />
    <Stack id='main' sx={{flex: 1, minHeight: '100%', overflowX: 'auto'}}>
      {children}
    </Stack>
    <Footer />
  </Providers>
}