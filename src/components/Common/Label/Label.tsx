import React from 'react'

type LabelProps = {
  text: string | undefined
  id?: string
}
export const Label = ({ text, id }: LabelProps) => {
  return (
    <label {...(id && { htmlFor: id })} className="text-black dark:text-yellow-50">
      {text ?? ''}
    </label>
  )
}
