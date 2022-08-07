/**
 * api管理
 */

import http from "../utils/http";

export default {
    login(params?: any) {
        return http({
            url: '/users/login',
            method: 'post',
            data: params
        })
    },
    getPermissionList() {
        return http({
            url: '/users/getPermissionList',
            method: 'get',
            data: {},
            mock: false
        })
    },
    roleOperate(params?: any) {
        return http({
            url: '/roles/operate',
            method: 'post',
            data: params,
            mock: false
        })
    }
}