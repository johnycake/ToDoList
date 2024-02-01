import React from 'react'
import { Column } from '../components/ComponentAlignment'
import { useNavigateTo } from '../hooks'
import { RouteNames } from '../navigation/RouteNames'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n/i18n'
import { Button } from '../components/Buttons/Button/Button'
import { MainNavBar } from '../components/Common/MainBar/MainNavBar'

export const Home = () => {
  const navigateTo = useNavigateTo()
  const { t } = useTranslation()

  React.useEffect(() => {
    i18n.changeLanguage('sk')
  }, [])

  const handleClickListButton = () => {
    navigateTo.withQuery({ Id: 'list123' }, RouteNames.HOME, RouteNames.LIST)
  }

  return (
    <>
      <MainNavBar />
      <Column center fullHeight>
        <Button onClick={handleClickListButton}>{t('todoList')}</Button>
      </Column>
    </>
  )
}
