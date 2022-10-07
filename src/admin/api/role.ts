import http from '../utils/http'
const baseurl = '/role'

export default {
    // 获取角色列表
    getRoleList(params?: any) {
        return http({
            url: `${baseurl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 获取全部菜单角色
    getAllMenuByRoleId() {
        return http({
            url: `${baseurl}/AllMenuByRoleId`,
            method: 'get',
            data: {},
            mock: false
        })
    },
    // 根据角色获取菜单列表
    getMenuListByRoleId(params?: any) {
        return http({
            url: `${baseurl}/MenuListByRoleId`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 新增角色
    roleAdd(params?: any) {
        return http({
            url: `${baseurl}/add`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 更新角色
    roleUpdate(params?: any) {
        return http({
            url: `${baseurl}/update`,
            method: 'post',
            data: params,
            mock: false
        })
    }
}