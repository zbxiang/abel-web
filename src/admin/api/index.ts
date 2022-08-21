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
    getRoleAllList() {
        return http({
            url: '/roles/allList',
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
    getDeptList(params?: any) {
        return http({
            url: '/dept/list',
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
    getMenuList(params?: any) {
        return http({
            url: '/menu/List',
            method: 'get',
            data: params,
            mock: false
        })
    },
    menuAdd(params?: any) {
        return http({
            url: '/menu/addMenu',
            method: 'post',
            data: params,
            mock: false
        })
    },
    menuUpdate(params?: any) {
        return http({
            url: '/menu/updateMenu',
            method: 'post',
            data: params,
            mock: false
        })
    },
    menuDelete(params?: any) {
        return http({
            url: '/menu/deleteMenu',
            method: 'get',
            data: params,
            mock: false
        })
    },
    getAllUserList() {
        return http({
            url: '/users/all/list',
            method: 'get',
            data: {},
            mock: false
        })
    },
    getUserList(params?: any) {
        return http({
            url: '/users/list',
            method: 'get',
            data: params,
            mock: false
        })
    },
    addUser(params?: any) {
        return http({
            url: '/users/addUser',
            method: 'post',
            data: params,
            mock: false
        })
    },
    updateUser(params?: any) {
        return http({
            url: '/users/updateUser',
            method: 'post',
            data: params,
            mock: false
        })
    },
    addDept(params?:any) {
        return http({
            url: '/dept/addDept',
            method: 'post',
            data: params,
            mock: false
        })
    }
}