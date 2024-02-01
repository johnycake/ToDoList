import React, { useState, ReactNode, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidV4 } from 'uuid'
import {
  DynamicElementItem,
  ElementDataProps,
  RenderableComponentProps
} from './DynamicElementItem'
import { Column, Flex } from '../../ComponentAlignment'
import { Button } from '../../Buttons/Button/Button'

const MAX_DYNAMIC_ATTRIBUTES_LENGTH = 100

interface DynamicElementsProps<T extends object> {
  initialElementsData?: ElementDataProps<T>[]
  defaultRenderableComponentData?: T
  addItemButtonLabelText?: string
  nonRemovableElementIds?: string[]
  showRemoveItemButton?: boolean
  renderableComponent: (props: RenderableComponentProps<ElementDataProps<T>>) => ReactNode
  onRemoveElement?: (id?: string) => void
}

export const getItemId = (): string => {
  return uuidV4()
}

export const getItemTimestamp = (): Date => {
  return new Date()
}

export const DynamicElements: <T extends object>({
  initialElementsData,
  renderableComponent
}: DynamicElementsProps<T>) => React.ReactElement<DynamicElementsProps<T>> = ({
  initialElementsData = [],
  defaultRenderableComponentData,
  addItemButtonLabelText,
  nonRemovableElementIds,
  showRemoveItemButton,
  renderableComponent,
  onRemoveElement
}) => {
  const [dynamicElementsData, setDynamicElementsData] = useState(initialElementsData)
  const addNextElementPermission = useRef<boolean>(true)
  const { t } = useTranslation()
  const [addRowError, setAddRowError] = useState<string>('')

  useEffect(() => {
    if (initialElementsData) {
      setDynamicElementsData(initialElementsData)
    }
  }, [initialElementsData])

  const removeElement = (id?: string) => {
    onRemoveElement?.(id)
    setDynamicElementsData((current) =>
      current.filter((currentElementData) => currentElementData.id != id)
    )
  }

  const getAddNextElementPermission = () => {
    const permission = addNextElementPermission.current
    return permission
  }

  const addElement = () => {
    if (!getAddNextElementPermission()) {
      return
    }

    if (dynamicElementsData.length < MAX_DYNAMIC_ATTRIBUTES_LENGTH) {
      setDynamicElementsData((current) => [
        ...current,
        {
          id: getItemId(),
          timestamp: getItemTimestamp(),
          isNewElement: true,
          data: defaultRenderableComponentData
        }
      ])
    } else {
      setAddRowError(
        t('dynamicElements.addRowErrorMessage', { value: MAX_DYNAMIC_ATTRIBUTES_LENGTH })
      )
    }
  }

  const setAddNextElementPermission = useCallback((canAddNextElement: boolean) => {
    addNextElementPermission.current = canAddNextElement
  }, [])

  const getDoNotRemoveFlag = (id?: string) => {
    return nonRemovableElementIds?.includes(id ?? '')
  }

  return (
    <Column fullWidth center>
      {dynamicElementsData.map((dynamicData) => (
        <DynamicElementItem
          key={dynamicData.id}
          id={dynamicData.id}
          defaultElementData={dynamicData}
          showRemoveItemButton={showRemoveItemButton}
          renderableComponent={renderableComponent}
          doNotRemove={getDoNotRemoveFlag(dynamicData.id)}
          onChange={(newData) => setDynamicElementsData((current) => [...current, newData])}
          removeElement={removeElement}
          setAddNextElementPermission={setAddNextElementPermission}
        />
      ))}
      {addRowError && (
        <div>
          <label>{addRowError}</label>
          <button onClick={() => setAddRowError('')} disabled={!getAddNextElementPermission()}>
            {t('dynamicElements.addRowErrorClose')}
          </button>
        </div>
      )}
      <Flex fullWidth centerContent>
        <Button onClick={addElement}>{addItemButtonLabelText ?? ''}</Button>
      </Flex>
    </Column>
  )
}
