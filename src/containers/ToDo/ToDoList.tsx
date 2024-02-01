import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DynamicElements,
  getItemTimestamp
} from '../../components/Common/DynamicElements/DynamicElements'
import { ToDoDataType, ToDoItem } from './ToDoItem'
import { ElementDataProps } from '../../components/Common/DynamicElements/DynamicElementItem'
import { DBRecord, useDatabase } from '../../hooks/useDatabase'
import { SearchInput } from '../../components/Inputs/SearchInput/SearchInput'
import { Column, Flex } from '../../components/ComponentAlignment'

export interface IToDoList {
  listId: string
}

type ToDoDataDbType = {
  title?: string
  text?: string
  deadline?: Date
  isDone?: string
}

export const ToDoList: React.FC<IToDoList> = ({ listId }) => {
  const { t } = useTranslation()
  const searchStringRef = useRef<string>('')
  const storedData = useRef<ElementDataProps<ToDoDataType>[]>([])
  const [listData, setListData] = useState<ElementDataProps<ToDoDataType>[]>([])
  const {
    initDB,
    add: addToLocalDb,
    update: updateRecordInLocalDb,
    get: getFromLocalDb,
    getAll: getAllFromLocalDb,
    remove: removeFromLocalDb
  } = useDatabase<ToDoDataDbType>(listId)

  const handleRemoveFromDataStore = (id?: string) => {
    id && removeFromLocalDb(id)
    setListData((current) => current.filter((c) => c.id !== id))
  }

  const mapStoredDataToFormData = (dbData?: DBRecord<ToDoDataDbType>[]) => {
    return dbData?.map<ElementDataProps<ToDoDataType>>((dbd) => {
      return {
        id: dbd.id as string,
        timestamp: dbd.timestamp,
        isNewElement: false,
        data: {
          title: dbd.data?.title,
          text: dbd.data?.text,
          deadline: dbd.data?.deadline,
          isDone: dbd.data?.isDone == 'true'
        }
      }
    })
  }

  const mapFormDataToStoredData = (formData?: ElementDataProps<ToDoDataType>[]) => {
    return formData?.map<DBRecord<ToDoDataDbType>>((fd) => {
      return {
        id: fd.id as string,
        timestamp: fd.timestamp,
        isNewElement: fd.isNewElement ? 'true' : 'false',
        data: {
          title: fd.data?.title,
          text: fd.data?.text,
          deadline: fd.data?.deadline,
          isDone: fd.data?.isDone ? 'true' : 'false'
        }
      }
    })
  }

  const handleGetAllDataFromDataStore = useCallback(async () => {
    await initDB()
    const { data: localDbData } = await getAllFromLocalDb()
    const mappedData = mapStoredDataToFormData(localDbData)
    if (mappedData) {
      storedData.current = mappedData
      const filteredData = filterData(mappedData, searchStringRef.current)
      setListData(filteredData)
    }
  }, [getAllFromLocalDb, initDB])

  const handleAddToDataStore = async (
    record?: ElementDataProps<ToDoDataType>
  ): Promise<{ ok: boolean }> => {
    if (record?.id && record?.data) {
      const dataToStore = mapFormDataToStoredData([record])?.[0]
      const result = await addToLocalDb({
        id: dataToStore?.id ?? getItemTimestamp(),
        timestamp: dataToStore?.timestamp,
        data: dataToStore?.data
      })
      handleGetAllDataFromDataStore()
      return { ok: result.ok }
    }
    return { ok: false }
  }

  const handleUpdateRecordInDataStore = async (
    record?: ElementDataProps<ToDoDataType>
  ): Promise<{ ok: boolean }> => {
    if (record?.id && record?.data) {
      const dataToStore = mapFormDataToStoredData([record])?.[0]
      if (!dataToStore?.id) {
        return { ok: false }
      }
      const result = await updateRecordInLocalDb({
        id: dataToStore?.id,
        timestamp: dataToStore?.timestamp,
        data: dataToStore?.data
      })
      handleGetAllDataFromDataStore()
      return { ok: result.ok }
    }
    return { ok: false }
  }

  const handleIsRecordExisting = useCallback(
    async (recordId?: string): Promise<boolean> => {
      if (recordId) {
        const result = await getFromLocalDb({ id: recordId })
        return !!result.data
      }
      return false
    },
    [getFromLocalDb]
  )

  useEffect(() => {
    handleGetAllDataFromDataStore()
  }, [handleGetAllDataFromDataStore])

  const filterData = (data: ElementDataProps<ToDoDataType>[], searchValue: string) => {
    const filteredData = data.filter((storedItem) => storedItem.data?.title?.includes(searchValue))
    return searchValue ? filteredData : data
  }

  const handleFilterChange = (value: string) => {
    searchStringRef.current = value
    setListData(filterData(listData, value))
  }
  return (
    <Column center width="80%">
      <Flex fullWidth centerContent>
        <SearchInput placeholder={t('general.placeholder')} onSearchSubmit={handleFilterChange} />
      </Flex>
      <DynamicElements<ToDoDataType>
        renderableComponent={(properties) => (
          <ToDoItem
            elementData={properties.elementData}
            addToDataStore={handleAddToDataStore}
            updateRecordInDataStore={handleUpdateRecordInDataStore}
            isRecordExisting={handleIsRecordExisting}
            setAddNextElementPermission={properties.setAddNextElementPermission}
            onDelete={handleRemoveFromDataStore}
          />
        )}
        initialElementsData={listData}
        addItemButtonLabelText={'+ ' + t('toDoList.addNextToDoItem')}
      />
    </Column>
  )
}
