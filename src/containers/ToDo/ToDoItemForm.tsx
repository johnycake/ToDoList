import { TFunction, useTranslation } from 'react-i18next'
import { FieldValues, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { TextInput } from '../../components/Inputs/TextInput/TextInput'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ElementDataProps } from '../../components/Common/DynamicElements/DynamicElementItem'
import { CheckBox } from '../../components/Inputs/CheckBox/CheckBox'
import { Column, Inline } from '../../components/ComponentAlignment'
import { DatePicker } from '../../components/Inputs/DatePicker/DatePicker'
import { ToDoDataType } from './ToDoItem'
import moment from 'moment'
import { CheckMarkIcon } from '../../components/Icons/CheckMarkIcon/CheckMarkIcon'
import { TrashIcon } from '../../components/Icons/TrashIcon/TrashIcon'

interface IToDoItemForm {
  elementDataProps?: ElementDataProps<ToDoDataType>
  onSubmit?: (elementData: ElementDataProps<ToDoDataType>) => void
  onDelete?: () => void
  setAddNextElementPermission: (canAddNextElement: boolean) => void
}

export const validationSchema = (
  t: TFunction<'translation', 'translation'>
): Yup.ObjectSchema<ToDoDataType> => {
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  return Yup.object()
    .shape({
      title: Yup.string().required(t('validation.required')),
      text: Yup.string().required(t('validation.required')),
      deadline: Yup.date()
        .typeError(t('validation.required'))
        .required(t('validation.required'))
        .min(today, `${t('validation.dateMustNotBeInPast')}`),
      isDone: Yup.boolean()
    })
    .defined()
}

export const ToDoItemForm: React.FC<IToDoItemForm> = ({
  elementDataProps,
  onSubmit,
  onDelete,
  setAddNextElementPermission
}) => {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  const mapElementDataToFormDataDefaultValue = (
    elementData?: ElementDataProps<ToDoDataType>
  ): ToDoDataType => {
    const mappedFormData: ToDoDataType = {
      title: elementData?.data?.title,
      text: elementData?.data?.text,
      deadline: formatDate(elementData?.data?.deadline) as unknown as Date,
      isDone: elementData?.data?.isDone
    }
    return mappedFormData
  }
  const formatDate = (date?: Date): string | undefined => {
    return date && moment(date).format('YYYY-MM-DD')
  }

  const { register, unregister, handleSubmit, setValue, watch, formState } = useForm<ToDoDataType>({
    resolver: yupResolver(validationSchema(t)),
    defaultValues: mapElementDataToFormDataDefaultValue(elementDataProps)
  })

  useEffect(() => {
    setAddNextElementPermission(false)
  }, [setAddNextElementPermission])

  useEffect(
    () => () => {
      unregister?.(`title`)
      unregister?.(`text`)
      unregister?.(`deadline`)
      setAddNextElementPermission(true)
    },
    [elementDataProps?.id, setAddNextElementPermission, unregister]
  )

  const mapFormDataToElementDataProps = (formData: FieldValues): ElementDataProps<ToDoDataType> => {
    const mappedFormData: ElementDataProps<ToDoDataType> = {
      id: elementDataProps?.id,
      timestamp: elementDataProps?.timestamp,
      data: {
        title: formData.title,
        text: formData.text,
        deadline: formData.deadline,
        isDone: formData.isDone
      }
    }
    return mappedFormData
  }

  const onFormSubmit = (formData: FieldValues) => {
    const mappedFormData: ElementDataProps<ToDoDataType> = mapFormDataToElementDataProps(formData)
    setAddNextElementPermission(true)
    setMounted(false)
    setTimeout(() => {
      onSubmit?.(mappedFormData)
    }, 500)    
    return
  }

  const handleDateChange = (newValue: Date | undefined) => {
    setValue('deadline', newValue)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={mounted ?
      "w-full transition ease-out transform rotate-x-0 duration-500" :
      "w-full transition ease-out transform -rotate-x-90 duration-500"
    }>
      <Inline stretch>
        <Column grow={1}>
          <Inline stretch>
            <TextInput
              label={t('toDoItems.title')}
              placeholder={t('general.placeholder')}
              {...register(`title`)}
              id={`title`}
              error={formState.errors?.title?.message}
              frameProps={{ grow: 1 }}
            />
            <DatePicker
              label={t('toDoItems.deadline')}
              value={watch('deadline')}
              onChange={handleDateChange}
              error={formState.errors?.deadline?.message}
              minimumToday
              frameProps={{ grow: 1 }}
            />
          </Inline>
          <Inline stretch>
            <CheckBox
              label={t('toDoItems.isDone')}
              {...register(`isDone`)}
              id={`isDone`}
              error={formState.errors?.isDone?.message}
            />
            <TextInput
              label={t('toDoItems.text')}
              placeholder={t('general.placeholder')}
              {...register(`text`)}
              id={`text`}
              error={formState.errors?.text?.message}
              frameProps={{ grow: 1 }}
            />
          </Inline>
        </Column>

        <Inline centerContent>
          <button type="submit">
            <CheckMarkIcon />
          </button>
          <button onClick={onDelete} type="button">
            <TrashIcon />
          </button>
        </Inline>
      </Inline>
    </form>
  )
}
