import React, { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'

type ThemeProps = {
  children: ReactNode
}

export type ThemeMode = 'light' | 'dark'

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('light')
  const colorContextValue = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode: ThemeMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
      colorMode: themeMode
    }),
    [themeMode]
  )

  return <ThemeContext.Provider value={colorContextValue}>{children}</ThemeContext.Provider>
}
