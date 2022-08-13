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
    getRoleList(params?: any) {
        return http({
            url: '/roles/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    roleAdd(params?: any) {
        return http({
            url: '/roles/add',
            method: 'post',
            data: params,
            mock: false
        })
    },
    roleUpdate(params?: any) {
        return http({
            url: '/roles/update',
            method: 'post',
            data: params,
            mock: false
        })
    },
    roleDelete(params?: any) {
        return http({
            url: '/roles/delete',
            method: 'post',
            data: params,
            mock: false
        })
    },
}