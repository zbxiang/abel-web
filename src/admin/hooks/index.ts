import setting from '../setting'
import Emit from './Emit'

export function useSetting() {
    return setting
}

export function useEmit() {
    return Emit()
}
  