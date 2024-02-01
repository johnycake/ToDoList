import React from 'react'
import { ThemeContext } from '../theme/ThemeContext'

export const useThemeMode = () => {
  const themeContext = React.useContext(ThemeContext)
  return themeContext.colorMode
}
