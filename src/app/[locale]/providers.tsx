import { ReactNode } from "react"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../utils/theme';

export async function Providers({ children }: { children: ReactNode }) {
  return <AppRouterCacheProvider>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
}