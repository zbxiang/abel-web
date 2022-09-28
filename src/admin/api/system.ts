import http from '../utils/http'
const baseMenuUrl = '/menu'
const baseDeptUrl = '/department'

export default {
    // 获取菜单列表
    getMenuList(params?: any) {
        return http({
            url: `${baseMenuUrl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 新增菜单
    menuAdd(params?: any) {
        return http({
            url: `${baseMenuUrl}/add`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 编辑菜单
    menuUpdate(params?: any) {
        return http({
            url: `${baseMenuUrl}/update`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 获取部门列表
    getDepartmentList(params?: any) {
        return http({
            url: `${baseDeptUrl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
}