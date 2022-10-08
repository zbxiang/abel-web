import http from '../../utils/http'
const baseUrl = '/user'

export default {
    login(params?: any) {
        return http({
            url: `${baseUrl}/login`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    getUserList(params?: any) {
        return http({
            url: `${baseUrl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 编辑用户
    userUpdate(params?: any) {
        return http({
            url: `${baseUrl}/update`,
            method: 'post',
            data: params,
            mock: false
        })
    }
}