/**
 * api管理
 */

import http from '../utils/http'
import Menu from './menu'
import Department from './department'

export default {
    login(params?: any) {
        return http({
            url: '/users/login',
            method: 'post',
            data: params
        })
    },
    noticeCount() {
        return http({
            url: '/leave/count',
            method: 'get',
            data: {},
            mock: false
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
    getMenuListByRoleId(params?: any) {
        return http({
            url: '/users/getMenuListByRoleId',
            method: 'get',
            data: params,
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
    updatePermission(params?: any) {
        return http({
            url: '/roles/update/permission',
            method: 'post',
            data: params,
            mock: false
        })
    },
    addMenu(params?: any) {
        return http({
            url: '/menu/add',
            method: 'post',
            data: params,
            mock: false
        })
    },
    updateMenu(params?: any) {
        return http({
            url: '/menu/update',
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
            url: '/users/add',
            method: 'post',
            data: params,
            mock: false
        })
    },
    updateUser(params?: any) {
        return http({
            url: '/users/update',
            method: 'post',
            data: params,
            mock: false
        })
    },
    deleteUser(params?: any) {
        return http({
            url: '/users/delete',
            method: 'post',
            data: params,
            mock: false
        })
    },
    addDept(params?:any) {
        return http({
            url: '/dept/add',
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 菜单管理
    ...Menu,
    // 部门管理
    ...Department
}