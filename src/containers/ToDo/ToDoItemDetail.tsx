import React, { useCallback, useEffect, useState } from 'react'
import { ElementDataProps } from '../../components/Common/DynamicElements/DynamicElementItem'
import { CheckBox } from '../../components/Inputs/CheckBox/CheckBox'
import { Column, Inline } from '../../components/ComponentAlignment'
import { Label } from '../../components/Common/Label/Label'
import { ToDoDataType } from './ToDoItem'
import { TrashIcon } from '../../components/Icons/TrashIcon/TrashIcon'

interface IToDoItemDetail<T extends object> {
  elementDataProps?: ElementDataProps<T>
  onDoEditing?: () => void
  onItemStateChange?: (elementData: ElementDataProps<ToDoDataType>) => void
  onDelete?: () => void
}

export const ToDoItemDetail: React.FC<IToDoItemDetail<ToDoDataType>> = ({
  elementDataProps,
  onDoEditing,
  onItemStateChange,
  onDelete
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  const handleChangeItemState = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newStateElementDataProps: ElementDataProps<ToDoDataType> = {
      ...elementDataProps,
      data: { ...elementDataProps?.data, isDone: e.target.checked }
    }
    onItemStateChange?.(newStateElementDataProps)
  }, [])

  const handleDoEditing = () => {
    setMounted(false)
    setTimeout(() => {
      onDoEditing?.()
    }, 500)
  }
// "transition ease-in-out toDoItem-hover-sizeUp duration-200 toDoItem-detail-base"

console.log({mounted})
  return (
    <div className={ mounted ?
    "transition ease-in-out transform rotate-x-0 duration-500 toDoItem-detail-base" : 
    "transition ease-in-out transform rotate-x-90 duration-500 toDoItem-detail-base"}>
      <Inline verticalCenter stretch onClick={handleDoEditing}>
        <CheckBox
          defaultChecked={!!elementDataProps?.data?.isDone}
          onChange={handleChangeItemState}
        />
        <Column >
          <Label text={elementDataProps?.data?.title ?? ''} />
          <Label text={elementDataProps?.data?.deadline?.toDateString() ?? ''} />
          <Label text={elementDataProps?.data?.text ?? ''} />
        </Column>
        <button onClick={onDelete} type="button">
          <TrashIcon />
        </button>
      </Inline>
    </div>
  )
}
