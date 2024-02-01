import React from 'react'

type CheckBoxIconType = {
  checked?: boolean
  id?: string
  onClick?: () => void
}

export const CheckBoxIcon = ({ checked, id, onClick }: CheckBoxIconType) => {
  return (
    <div id={id} onClick={() => onClick?.()}>
      {checked ? (
        <svg
          className="h-10 w-10 flex-shrink-0 text-cyan-500"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="h-10 w-10 flex-shrink-0 text-cyan-500"
          viewBox="0 0 20 20"
          fill="currentColor">
          <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="transparent" />
        </svg>
      )}
    </div>
  )
}
