import React from 'react'
import { useNavigateTo } from '../../../hooks'
import { RouteNames } from '../../../navigation/RouteNames'
import { HomeIcon } from '../../Icons/HomeIcon/HomeIcon'
import styles from './homeButton.module.scss'

export const HomeButton = () => {
  const navigateTo = useNavigateTo()

  return (
    <button
      className={styles.generalStyle}
      onClick={() => {
        navigateTo.page(RouteNames.HOME)
      }}>
      <HomeIcon />
    </button>
  )
}
