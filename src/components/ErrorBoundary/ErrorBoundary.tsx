import React, { Component, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Label } from '../Common'

interface Props {
  children?: ReactNode
  hasError: boolean
  setHasError: (hasError: boolean) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export const ErrorBoundary = ({ children }: PropsWithChildren) => {
  const [hasError, setHasError] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if (hasError) {
      setHasError(false)
    }
  }, [hasError, location.key])
  return (
    <ErrorBoundaryInner hasError={hasError} setHasError={setHasError}>
      {children}
    </ErrorBoundaryInner>
  )
}

class ErrorBoundaryInner extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error }
  }

  componentDidUpdate(prevProps: { hasError: boolean }) {
    if (!this.props.hasError && prevProps.hasError) {
      this.setState({ hasError: false })
    }
  }

  public componentDidCatch(error: Error) {
    this.props.setHasError(true)
    this.setState({ error: error })
  }

  public render() {
    if (this.state.hasError) {
      return <Label text={this.state.error?.message} />
    }
    return this.props.children
  }
}
