import React, { forwardRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Column } from '../../ComponentAlignment'

type TextProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string
  label?: string
  error?: string
}
export const DatePickerClassic = forwardRef<HTMLInputElement, TextProps>(
  ({ label, id = `textInput-${uuidV4()}`, error, ...rest }: TextProps, ref) => {
    return (
      <Column width="150px" height="90px">
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          ref={ref}
          {...rest}
          className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 text-sm font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none dark:bg-gray-950 dark:text-white/80 dark:placeholder:text-white/80"
        />
        <span>{error}</span>
      </Column>
    )
  }
)

DatePickerClassic.displayName = 'DatePickerClassic'
