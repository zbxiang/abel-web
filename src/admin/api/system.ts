import http from '../utils/http'
const baseUrl = '/menu'

export default {
    // 获取菜单列表
    getMenuList(params?: any) {
        return http({
            url: `${baseUrl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 新增菜单
    menuAdd(params?: any) {
        return http({
            url: `${baseUrl}/add`,
            method: 'post',
            data: params,
            mock: false
        })
    },
}