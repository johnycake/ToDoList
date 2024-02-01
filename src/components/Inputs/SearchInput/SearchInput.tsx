import React, { useEffect } from 'react'
import { Column, Inline } from '../../ComponentAlignment'
import { TextInput } from '../TextInput/TextInput'
import { SearchButton } from '../../Buttons/SearchButton/SearchButton'
import { Label } from '../../Common/Label/Label'
import { FieldValues, useForm } from 'react-hook-form'

type SearchInputProps = {
  label?: string
  placeholder?: string
  onChange?: (searchValue: string) => void
  onSearchSubmit?: (searchValue: string) => void
}

export const SearchInput = ({ label, placeholder, onChange, onSearchSubmit }: SearchInputProps) => {
  const { register, unregister, handleSubmit, watch } = useForm<{ searchInput: string }>()

  const searchInputWatch = watch('searchInput')

  useEffect(() => {
    onChange?.(searchInputWatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInputWatch])

  useEffect(
    () => () => {
      unregister('searchInput')
    },
    [unregister]
  )

  const handleOnSearchSubmit = (formData: FieldValues) => {
    onSearchSubmit?.(formData.searchInput)
  }

  return (
    <Column fullWidth center>
      {label && <Label text={label} />}
      <form onSubmit={handleSubmit(handleOnSearchSubmit)} className="flex w-full justify-center">
        <Inline width={'50%'} centerContent>
          <TextInput
            placeholder={placeholder}
            frameProps={{ height: '40px', width: 'inherit' }}
            {...register('searchInput')}
          />
          <SearchButton />
        </Inline>
      </form>
    </Column>
  )
}

SearchInput.displayName = 'SearchInput'
