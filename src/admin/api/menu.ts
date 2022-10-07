import http from '../utils/http'
const baseurl = '/menu'

export default {
    // 获取菜单列表
    getMenuList(params?: any) {
        return http({
            url: `${baseurl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 新增菜单
    menuAdd(params?: any) {
        return http({
            url: `${baseurl}/add`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 编辑菜单
    menuUpdate(params?: any) {
        return http({
            url: `${baseurl}/update`,
            method: 'post',
            data: params,
            mock: false
        })
    }
}