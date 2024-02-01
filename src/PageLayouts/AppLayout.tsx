import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useThemeMode } from '../hooks/useTheme'

export const AppLayout = () => {
  const themeMode = useThemeMode()

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeMode])

  return (
    <div className="h-screen bg-yellow-100 dark:bg-black">
      <Outlet />
    </div>
  )
}
