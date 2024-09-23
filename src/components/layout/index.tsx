"use client"

import { ThemeProvider } from "@sanity/ui"
import { buildTheme } from "@sanity/ui/theme";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const theme = buildTheme()
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default Layout