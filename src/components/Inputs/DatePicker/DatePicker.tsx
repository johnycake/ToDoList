import React from 'react'
import { Column } from '../../ComponentAlignment'
import DatePickerTailWind, { DateValueType } from 'react-tailwindcss-datepicker'
import { Label } from '../../Common'
import { ColumnType } from '../../ComponentAlignment/Column/Column'

type DatePickerProps = {
  value?: Date
  onChange: (value: Date | undefined) => void
  minimumToday?: boolean
  label?: string
  error?: string
  frameProps?: ColumnType
}

export const DatePicker = ({
  label,
  error,
  value,
  onChange,
  minimumToday,
  frameProps
}: DatePickerProps) => {
  const handleDateChange = (newValue: DateValueType) => {
    onChange((newValue?.startDate as Date) ?? undefined)
  }

  const mapToDatePickerValue = (dateValue?: Date): DateValueType => {
    return { startDate: dateValue ?? null, endDate: dateValue ?? null }
  }

  return (
    <Column {...frameProps}>
      <Label text={label} />
      <DatePickerTailWind
        value={mapToDatePickerValue(value)}
        onChange={handleDateChange}
        asSingle
        {...(minimumToday && { minDate: new Date() })}
      />
      <Label text={error} />
    </Column>
  )
}

DatePicker.displayName = 'DatePicker'
