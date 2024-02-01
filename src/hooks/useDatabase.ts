import { DBSchema, openDB, deleteDB } from 'idb'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { environment } from '../environment'

export type DBRecord<DATA> = {
  id: string | Date | number
  timestamp?: Date
  isNewElement?: string
  data?: DATA
}

export enum DbErrors {
  noDataToWriteIntoDb = 'noDataToWriteIntoDb',
  dBNameError = 'dBNameError',
  dbBlocked = 'dbBlocked',
  dbTerminated = 'dbTerminated'
}

export type DbErrorType = string | undefined
type IDType = string | Date | number

interface AppDB<DATA> extends DBSchema {
  data: {
    key: string
    value: DBRecord<DATA>
  }
}

type UseDatabaseType<DATA> = {
  initDB: () => Promise<{ ok: boolean; error: DbErrorType }>
  initError: unknown
  removeDB: () => Promise<{ ok: boolean; error: DbErrorType }>
  clearDB: () => Promise<{ ok: boolean; error: DbErrorType }>
  add: (record: DBRecord<DATA>) => Promise<{ ok: boolean; error: DbErrorType }>
  update: (record: DBRecord<DATA>) => Promise<{ ok: boolean; error: DbErrorType }>
  get: (record: { id: IDType }) => Promise<{ data?: DBRecord<DATA>; error: DbErrorType }>
  getAll: () => Promise<{ data: DBRecord<DATA>[] | undefined; error: DbErrorType }>
  remove: (id: IDType) => Promise<{ ok: boolean; error: DbErrorType }>
}

export const useDatabase = <DATA = string>(dataStoreName: string): UseDatabaseType<DATA> => {
  const databaseName = useMemo(() => environment.DATABASE_NAME, [])
  const [initError, setInitError] = useState<unknown>(undefined)

  const initializeDB = useCallback(async (): Promise<{ ok: boolean; error: DbErrorType }> => {
    if (!databaseName) {
      setInitError(new Error(DbErrors.dBNameError))
      return { ok: false, error: DbErrors.dBNameError }
    }
    let errorOccurred: DbErrorType = undefined
    await openDB<AppDB<DATA>>(databaseName, 1, {
      upgrade(db) {
        db.createObjectStore(dataStoreName as never, { keyPath: 'id', autoIncrement: true })
      },
      blocked: () => {
        errorOccurred = DbErrors.dbBlocked
        setInitError(new Error(errorOccurred))
      },
      terminated: () => {
        errorOccurred = DbErrors.dbTerminated
        setInitError(new Error(errorOccurred))
      }
    })
    return { ok: !errorOccurred, error: errorOccurred }
  }, [dataStoreName, databaseName])

  const removeDB = useCallback(async (): Promise<{ ok: boolean; error: DbErrorType }> => {
    let errorOccurred: DbErrorType = undefined

    if (!databaseName) {
      return { ok: false, error: DbErrors.dBNameError }
    }

    try {
      await deleteDB(databaseName, {
        blocked: () => {
          errorOccurred = DbErrors.dbBlocked
        }
      })
      return { ok: !errorOccurred, error: errorOccurred }
    } catch (err) {
      if (err instanceof Error) {
        errorOccurred = err.message
      }
      return { ok: false, error: errorOccurred }
    }
  }, [databaseName])

  const clearDB = useCallback(async (): Promise<{ ok: boolean; error: DbErrorType }> => {
    if (!databaseName) {
      return { ok: false, error: DbErrors.dBNameError }
    }
    let errorOccurred: DbErrorType = undefined

    const db = await openDB<AppDB<DATA>>(databaseName, 1, {
      blocked: () => {
        errorOccurred = DbErrors.dbBlocked
      },
      terminated: () => {
        errorOccurred = DbErrors.dbTerminated
      }
    })

    if (errorOccurred) {
      db.close()
      return { ok: false, error: errorOccurred }
    }

    try {
      await db.clear(dataStoreName as never)
      return { ok: true, error: undefined }
    } catch (err) {
      if (err instanceof Error) {
        errorOccurred = err.message
      }
      return { ok: false, error: errorOccurred }
    } finally {
      db.close()
    }
  }, [dataStoreName, databaseName])

  const addRecord = useCallback(
    async ({
      data,
      id,
      timestamp
    }: DBRecord<DATA>): Promise<{ ok: boolean; error: DbErrorType }> => {
      let errorOccurred: DbErrorType = undefined

      if (!databaseName) {
        return { ok: false, error: DbErrors.dBNameError }
      }

      const db = await openDB<AppDB<DATA>>(databaseName, 1, {
        blocked: () => {
          errorOccurred = DbErrors.dbBlocked
        },
        terminated: () => {
          errorOccurred = DbErrors.dbTerminated
        }
      })

      if (errorOccurred) {
        db.close()
        return { ok: false, error: errorOccurred }
      }

      if (!data) {
        db.close()
        return { ok: false, error: DbErrors.noDataToWriteIntoDb }
      }
      try {
        const recordId = id ? id : moment.now()
        const dbRecord: DBRecord<DATA> = { id: recordId, timestamp, data }
        await db.add(dataStoreName as never, dbRecord)
        return { ok: true, error: undefined }
      } catch (err) {
        if (err instanceof Error) {
          errorOccurred = err.message
        }
        return { ok: false, error: errorOccurred }
      } finally {
        db.close()
      }
    },
    [dataStoreName, databaseName]
  )

  const updateRecord = useCallback(
    async ({
      data,
      id,
      timestamp
    }: DBRecord<DATA>): Promise<{ ok: boolean; error: DbErrorType }> => {
      let errorOccurred: DbErrorType = undefined

      if (!databaseName) {
        return { ok: false, error: DbErrors.dBNameError }
      }

      const db = await openDB<AppDB<DATA>>(databaseName, 1, {
        blocked: () => {
          errorOccurred = DbErrors.dbBlocked
        },
        terminated: () => {
          errorOccurred = DbErrors.dbTerminated
        }
      })

      if (errorOccurred) {
        db.close()
        return { ok: false, error: errorOccurred }
      }

      if (!data) {
        db.close()
        return { ok: false, error: DbErrors.noDataToWriteIntoDb }
      }
      try {
        const recordId = id ? id : moment.now()
        const dbRecord: DBRecord<DATA> = { id: recordId, timestamp, data }
        await db.put(dataStoreName as never, dbRecord)
        return { ok: true, error: undefined }
      } catch (err) {
        if (err instanceof Error) {
          errorOccurred = err.message
        }
        return { ok: false, error: errorOccurred }
      } finally {
        db.close()
      }
    },
    [dataStoreName, databaseName]
  )

  const deleteRecord = useCallback(
    async (id: IDType): Promise<{ ok: boolean; error: DbErrorType }> => {
      let errorOccurred: DbErrorType = undefined

      if (!databaseName) {
        return { ok: false, error: DbErrors.dBNameError }
      }

      const db = await openDB(databaseName, 1, {
        blocked: () => {
          errorOccurred = DbErrors.dbBlocked
        },
        terminated: () => {
          errorOccurred = DbErrors.dbTerminated
        }
      })

      if (errorOccurred) {
        db.close()
        return { ok: false, error: errorOccurred }
      }

      try {
        await db.delete(dataStoreName, id)
        return { ok: true, error: undefined }
      } catch (err) {
        if (err instanceof Error) {
          errorOccurred = err.message
        }
        return { ok: false, error: errorOccurred }
      } finally {
        db.close()
      }
    },
    [dataStoreName, databaseName]
  )

  const getRecord = useCallback(
    async ({
      id
    }: {
      id: string | Date | number
    }): Promise<{ data?: DBRecord<DATA>; error: DbErrorType }> => {
      let errorOccurred: DbErrorType = undefined

      if (!databaseName) {
        return { data: undefined, error: DbErrors.dBNameError }
      }

      const db = await openDB(databaseName, 1, {
        blocked: () => {
          errorOccurred = DbErrors.dbBlocked
        },
        terminated: () => {
          errorOccurred = DbErrors.dbTerminated
        }
      })

      if (errorOccurred) {
        db.close()
        return { data: undefined, error: errorOccurred }
      }

      let result: DBRecord<DATA> | undefined = undefined
      try {
        result = await db.get(dataStoreName, id)
        return { data: result, error: undefined }
      } catch (err) {
        if (err instanceof Error) {
          errorOccurred = err.message
        }
        return { data: undefined, error: errorOccurred }
      } finally {
        db.close()
      }
    },
    [dataStoreName, databaseName]
  )

  const getAllRecords = useCallback(async (): Promise<{
    data: DBRecord<DATA>[] | undefined
    error: DbErrorType
  }> => {
    let errorOccurred: DbErrorType = undefined

    if (!databaseName) {
      return { data: undefined, error: DbErrors.dBNameError }
    }

    const db = await openDB<AppDB<DATA>>(databaseName, 1, {
      blocked: () => {
        errorOccurred = DbErrors.dbBlocked
      },
      terminated: () => {
        errorOccurred = DbErrors.dbTerminated
      }
    })

    if (errorOccurred) {
      db.close()
      return { data: undefined, error: errorOccurred }
    }

    let result: DBRecord<DATA>[] | undefined

    try {
      result = await db.getAll(dataStoreName as never)
      return { data: result, error: undefined }
    } catch (err) {
      if (err instanceof Error) {
        errorOccurred = err.message
      }
      return { data: undefined, error: errorOccurred }
    } finally {
      db.close()
    }
  }, [dataStoreName, databaseName])

  useEffect(() => {
    initializeDB()
  }, [initializeDB])

  return {
    initDB: initializeDB,
    initError: initError,
    removeDB: removeDB,
    clearDB: clearDB,
    add: addRecord,
    update: updateRecord,
    get: getRecord,
    getAll: getAllRecords,
    remove: deleteRecord
  }
}
