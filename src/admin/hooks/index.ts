import setting from '../setting'
import dataTable from './DataTable'
import Emit from './Emit'
import baseForm from './Form'

export function useSetting() {
    return setting
}

export function useDataTable<T>() {
    return dataTable<T>()
}

export function useForm() {
    return baseForm()
}

export function useEmit() {
    return Emit()
}
  