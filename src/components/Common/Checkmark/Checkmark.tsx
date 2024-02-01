import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import './Checkmark.css'
import { Flex } from '../../ComponentAlignment'

export type CheckmarkType = {
  show?: () => void
  hide?: boolean
}
export const Checkmark = forwardRef(({ hide }: CheckmarkType, ref) => {
  const [reload, setReload] = useState<boolean>(false)
  useImperativeHandle(ref, () => ({
    show() {
      return reloadCheckmark()
    }
  }))

  useEffect(() => {
    let hideAfterReloadInterval: NodeJS.Timer
    if (!reload) {
      hideAfterReloadInterval = setInterval(() => {
        setReload(false)
        clearInterval(hideAfterReloadInterval)
      }, 1500)
    }
    return () => {
      clearInterval(hideAfterReloadInterval)
    }
  }, [reload])

  const reloadCheckmark = () => {
    if (!reload) {
      setReload(true)
      const hideAfterReloadInterval = setInterval(() => {
        setReload(false)
        clearInterval(hideAfterReloadInterval)
      }, 1500)
    }
  }
  return (
    <Flex>
      {!hide && reload ? (
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      ) : null}
    </Flex>
  )
})

Checkmark.displayName = 'Checkmark'
