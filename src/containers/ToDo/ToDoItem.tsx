import { TFunction } from 'react-i18next'
import React, { useCallback, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { ElementDataProps } from '../../components/Common/DynamicElements/DynamicElementItem'
import { Flex } from '../../components/ComponentAlignment'
import { ToDoItemForm } from './ToDoItemForm'
import { ToDoItemDetail } from './ToDoItemDetail'

export type ToDoDataType = {
  title?: string
  text?: string
  deadline?: Date
  isDone?: boolean
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

interface IToDoItem {
  elementData: ElementDataProps<ToDoDataType>
  addToDataStore?: (record: ElementDataProps<ToDoDataType>) => Promise<{ ok: boolean }>
  updateRecordInDataStore?: (record: ElementDataProps<ToDoDataType>) => Promise<{ ok: boolean }>
  isRecordExisting?: (recordId: string) => Promise<boolean>
  setAddNextElementPermission: (canAddNextElement: boolean) => void
  onDelete?: (id: string) => void
}

export const ToDoItem: React.FC<IToDoItem> = ({
  elementData,
  addToDataStore,
  updateRecordInDataStore,
  isRecordExisting,
  setAddNextElementPermission,
  onDelete
}) => {
  const [itemState, setItemState] = useState<{
    isEditing: boolean
    itemData: ElementDataProps<ToDoDataType>
  }>({
    isEditing: elementData.isNewElement ?? true,
    itemData: elementData
  })

  const handleDoEditing = useCallback(() => {
    if (!itemState.isEditing) {
      setAddNextElementPermission(false)
      setItemState((current) => {
        return { ...current, isEditing: true }
      })
    }
  }, [itemState.isEditing, setAddNextElementPermission])

  const decideIfIsCreatingNewItem = useCallback(async () => {
    if (elementData.id && itemState.itemData.isNewElement) {
      handleDoEditing()
    }
  }, [elementData.id, handleDoEditing, itemState.itemData.isNewElement])

  const checkIfItemExists = useCallback(async () => {
    if (elementData.id) {
      const result = (await isRecordExisting?.(elementData.id)) ?? false
      return result
    }
    return false
  }, [elementData.id, isRecordExisting])

  useEffect(() => {
    decideIfIsCreatingNewItem()
  }, [decideIfIsCreatingNewItem])

  const handleAddRecord = useCallback(
    (element: ElementDataProps<ToDoDataType>) => {
      const newElement = { ...element, isNewElement: false }
      addToDataStore?.(newElement)
      setItemState({ isEditing: false, itemData: newElement })
    },
    [addToDataStore]
  )

  const handleUpdateRecord = useCallback(
    (element: ElementDataProps<ToDoDataType>) => {
      updateRecordInDataStore?.(element)
      setItemState({ isEditing: false, itemData: element })
    },
    [updateRecordInDataStore]
  )

  const handleSubmit = useCallback(
    (element: ElementDataProps<ToDoDataType>) => {
      if (element.isNewElement) {
        handleAddRecord(element)
      } else {
        handleUpdateRecord(element)
      }
      setAddNextElementPermission(true)
    },
    [handleAddRecord, handleUpdateRecord, setAddNextElementPermission]
  )

  const handleDeleteItem = () => {
    if (!elementData.id) {
      return
    }
    onDelete?.(elementData.id)
  }

  return (
    <Flex fullWidth>
      {itemState.isEditing ? (
        <ToDoItemForm
          elementDataProps={itemState.itemData}
          onSubmit={handleSubmit}
          setAddNextElementPermission={setAddNextElementPermission}
          onDelete={handleDeleteItem}
        />
      ) : (
        <ToDoItemDetail
          elementDataProps={itemState.itemData}
          onDoEditing={handleDoEditing}
          onItemStateChange={handleUpdateRecord}
          onDelete={handleDeleteItem}
        />
      )}
    </Flex>
  )
}
