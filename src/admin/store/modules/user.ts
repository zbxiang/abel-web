import LayoutStore from '../../layout'
import Cookies from 'js-cookie'
import Avatar from '../../assets/img_avatar.gif'
import { defineStore } from 'pinia'
import { UserState } from '../types'
import storage from '../../utils/storage'

import {
    ROLE_ID_KEY,
    USER_ID_KEY,
    USER_INFO_KEY,
    USER_TOKEN_KEY
} from '../keys'

const defaultAvatar = Avatar

const userInfo: UserState = JSON.parse(
    storage.getItem(USER_INFO_KEY) || '{}'
)

const useUserStore = defineStore('user', {
    state: () => {
        return {
            userId: userInfo.userId || 0,
            userName: userInfo.userName || '',
            deptId: userInfo.deptId || null,
            roleList: userInfo.roleList || null,
            role: userInfo.role || 0,
            token: userInfo.token || '',
            userEmail: userInfo.userEmail || '',
            state: userInfo.state || 0,
            nickName: userInfo.nickName || '',
            avatar: userInfo.avatar || defaultAvatar
        }
    },
    getters: {
        getUserId(): number {
            return this.userId
        },
        getRoleId(): number {
            return this.role
        },
        getToken(): string {
            return this.token
        }
    },
    actions: {
        saveUser(userInfo: UserState) {
            return new Promise<void>((res) => {
                this.userId = userInfo.userId
                this.userName = userInfo.userName
                this.deptId = userInfo.deptId
                this.roleList = userInfo.roleList
                this.role = userInfo.role
                this.token = userInfo.token
                this.userEmail = userInfo.userEmail
                this.nickName = userInfo.nickName
                this.avatar = userInfo.avatar || defaultAvatar
                Cookies.set(USER_TOKEN_KEY, userInfo.token)
                storage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
                res()
            });
        },
        changeNickName(newNickName: string) {
            this.nickName = newNickName
        },
        logout() {
            return new Promise<void>((res) => {
                this.userId = 0
                this.userName = ''
                this.roleList = []
                this.role = 0
                this.token = ''
                this.userEmail = ''
                this.state = 0
                this.nickName = ''
                this.avatar = ''
                Cookies.remove(USER_TOKEN_KEY)
                storage.clearAll()
                LayoutStore.reset()
                res()
            })
        }
    }
})

export default useUserStore