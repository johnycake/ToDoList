import React, { ReactElement, ReactNode } from 'react'
import { Flex, Inline } from '../../ComponentAlignment'
import { TrashIcon } from '../../Icons/TrashIcon/TrashIcon'

export interface ElementDataProps<T extends object> {
  id?: string
  isNewElement?: boolean
  timestamp?: Date
  data?: T
}

export interface RenderableComponentProps<T extends object> {
  elementData: T
  onChange?: (data: T) => void
  onDelete?: () => void
  setAddNextElementPermission: (canAddNextElement: boolean) => void
}

interface IDynamicElementItem<T extends object> {
  id?: string
  defaultElementData: T
  doNotRemove?: boolean
  showRemoveItemButton?: boolean
  removeElement: (id?: string) => void
  renderableComponent: (props: RenderableComponentProps<T>) => ReactNode
  onChange?: (data: T) => void
  setAddNextElementPermission: (canAddNextElement: boolean) => void
}

export const DynamicElementItem: <T extends object>({
  id,
  defaultElementData,
  doNotRemove,
  showRemoveItemButton,
  removeElement,
  renderableComponent,
  onChange,
  setAddNextElementPermission
}: IDynamicElementItem<T>) => ReactElement<IDynamicElementItem<T>> = ({
  id,
  removeElement,
  defaultElementData,
  doNotRemove,
  showRemoveItemButton,
  renderableComponent,
  onChange,
  setAddNextElementPermission
}) => {
  const handleRemoveElement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    removeElement(id)
  }

  const handleDeleteElement = () => {
    !doNotRemove && removeElement(id)
  }

  return (
    <Inline centerContent stretch>
      <Flex fullWidth>
        {renderableComponent({
          elementData: defaultElementData,
          onChange,
          setAddNextElementPermission,
          onDelete: handleDeleteElement
        })}
      </Flex>
      {showRemoveItemButton && !doNotRemove && (
        <button onClick={handleRemoveElement} type="button">
          <TrashIcon />
        </button>
      )}
    </Inline>
  )
}
