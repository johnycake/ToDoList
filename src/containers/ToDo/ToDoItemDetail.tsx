import React from 'react'
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
  const handleChangeItemState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStateElementDataProps: ElementDataProps<ToDoDataType> = {
      ...elementDataProps,
      data: { ...elementDataProps?.data, isDone: e.target.checked }
    }
    onItemStateChange?.(newStateElementDataProps)
  }

  return (
    <div className="mx-auto flex w-full items-center space-x-4 rounded-xl bg-lime-500 p-6 shadow-lg">
      <Inline verticalCenter stretch>
        <CheckBox
          defaultChecked={!!elementDataProps?.data?.isDone}
          onChange={handleChangeItemState}
        />
        <Column onClick={onDoEditing}>
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
