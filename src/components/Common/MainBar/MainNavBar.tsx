import React from 'react'
import { HomeButton } from '../../Buttons/HomeButton/HomeButton'
import { SwitchThemeButton } from '../../Buttons/SwitchThemeButton/SwitchThemeButton'
import { useThemeMode } from '../../../hooks/useTheme'
import { Label } from '..'
import styles from './mainNavBar.module.scss'

type MainNavBarType = {
  title?: string
}

export const MainNavBar = ({ title }: MainNavBarType) => {
  const themeMode = useThemeMode()

  return (
    <div className={themeMode === 'light' ? styles.lightTheme : styles.darkTheme}>
      <HomeButton />
      <Label text={title} />
      <SwitchThemeButton />
    </div>
  )
}
