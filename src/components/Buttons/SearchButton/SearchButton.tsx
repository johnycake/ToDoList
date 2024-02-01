import React from 'react'
import SearchWhiteIcon from '../../../asset/SearchWhite.svg'
import SearchBlackIcon from '../../../asset/SearchBlack.svg'

import styles from './searchButton.module.scss'

type SearchButtonProps = {
  disable?: boolean
  onClick?: () => unknown
}

export const SearchButton = ({ disable, onClick }: SearchButtonProps) => {
  return (
    <button
      type="submit"
      className={disable ? styles.buttonStyleDisabled : styles.buttonStyleEnabled}
      disabled={disable}
      onClick={onClick}>
      {disable ? (
        <img src={SearchBlackIcon} alt="search" />
      ) : (
        <img src={SearchWhiteIcon} alt="search" />
      )}
    </button>
  )
}
