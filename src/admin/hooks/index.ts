import setting from '../setting'
import dataTable from './DataTable'
import Emit from './Emit'

export function useSetting() {
    return setting
}

export function useDataTable<T>() {
    return dataTable<T>()
}

export function useEmit() {
    return Emit()
}
  