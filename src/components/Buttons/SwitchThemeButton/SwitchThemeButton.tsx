import React from 'react'
import { ThemeContext } from '../../../theme/ThemeContext'
import { LightIcon } from '../../Icons/LightIcon/LightIcon'
import { DarkIcon } from '../../Icons/DarkIcon/DarkIcon'
import styles from './switchThemeButton.module.scss'

export const SwitchThemeButton = () => {
  const colorContext = React.useContext(ThemeContext)
  return (
    <button onClick={colorContext.toggleColorMode} className={styles.generalStyle}>
      {colorContext.colorMode === 'dark' ? <LightIcon /> : <DarkIcon />}
    </button>
  )
}
