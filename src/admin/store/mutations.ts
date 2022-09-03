/**
 * Mutations业务层数据提交
 * 
 */
import $storage from "../utils/storage"

export default {
    saveUserInfo(state: { userInfo: any }, userInfo: any) {
        state.userInfo = userInfo
        $storage.setItem('userInfo', userInfo)
    },
    saveMenuList(state: { menuList: (number | string)[] }, menuList: (number | string)[]) {
        state.menuList = menuList
        $storage.setItem('menuList', menuList)
    },
    saveActionList(state: { actionList: (number | string)[] }, actionList: (number | string)[]) {
        state.actionList = actionList
        $storage.setItem('actionList', actionList)
    },
    saveNoticeCount(state: { noticeCount: number }, noticeCount: number) {
        state.noticeCount = noticeCount
        $storage.setItem('noticeCount', noticeCount)
    }
}