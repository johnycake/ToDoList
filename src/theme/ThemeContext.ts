import React from 'react'
import { ThemeMode } from './ThemeProvider'
interface ColorContextSchema {
  toggleColorMode: () => void
  colorMode: ThemeMode
}
export const ThemeContext = React.createContext<ColorContextSchema>({} as ColorContextSchema)
