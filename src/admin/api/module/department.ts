import http from '../../utils/http'
const baseUrl = '/department'

export default {
    // 获取部门列表
    getDepartmentList(params?: any) {
        return http({
            url: `${baseUrl}/list`,
            method: 'get',
            data: params,
            mock: false
        })
    },
    // 新增部门
    departmentAdd(params?: any) {
        return http({
            url: `${baseUrl}/add`,
            method: 'post',
            data: params,
            mock: false
        })
    },
    // 更新部门
    departmentUpdate(params?: any) {
        return http({
            url: `${baseUrl}/update`,
            method: 'post',
            data: params,
            mock: false
        })
    }
}