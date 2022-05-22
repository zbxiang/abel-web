/**
 * Mutations业务层数据提交
 */
import storage from '@C/utils/storage'

export default {
    saveUserInfo(state: { userInfo: any }, userInfo: any) {
        state.userInfo= userInfo
        storage.setItem('userInfo', userInfo)
    }
}