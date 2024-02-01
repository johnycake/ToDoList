import React, { forwardRef } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { Column } from '../../ComponentAlignment'
import { ColumnType } from '../../ComponentAlignment/Column/Column'
import { Label } from '../../Common'

type TextProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  frameProps?: ColumnType
}
export const TextInput = forwardRef<HTMLInputElement, TextProps>(
  (
    { label, id = `textInput-${uuidV4()}`, placeholder, error, frameProps, ...rest }: TextProps,
    ref
  ) => {
    return (
      <Column {...frameProps}>
        {label && <Label id={id} text={label} />}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          id={id}
          ref={ref}
          {...rest}
        />
        {error && <Label text={error} />}
      </Column>
    )
  }
)

TextInput.displayName = 'TextInput'
