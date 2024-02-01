import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '../PageLayouts/AppLayout'
import { RouteNames } from './RouteNames'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Home } from '../Pages/Home'
import { ToDoListPage } from '../Pages/ToDoPage'

export const Router = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path={RouteNames.HOME} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path={RouteNames.LIST} element={<ToDoListPage />} />
          <Route path={RouteNames.LIST} element={<ToDoListPage />} />
        </Route>
        <Route path="*" element={<Navigate to={RouteNames.HOME} replace />} />
      </Routes>
    </ErrorBoundary>
  )
}
