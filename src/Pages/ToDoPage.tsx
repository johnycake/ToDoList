import React from 'react'
import { ToDoList } from '../containers'
import { useQueryParams } from '../hooks'
import { MainNavBar } from '../components/Common/MainBar/MainNavBar'
import { Column } from '../components/ComponentAlignment'

export const ToDoListPage = () => {
  const { Id } = useQueryParams()

  return (
    <Column>
      <MainNavBar title={Id} />
      <Column center>{Id && <ToDoList listId={Id} />}</Column>
    </Column>
  )
}
