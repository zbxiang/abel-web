/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'

interface modeType {
    baseApi: string,
    mockApi: string
}

const EnvConfig: any = {
    development: <modeType>{
        baseApi: '/dev',
        mockApi: ''
    },
    test: <modeType>{
        baseApi: '/test',
        mockApi: ''
    },
    prod: <modeType>{
        baseApi: '/prod',
        mockApi: ''
    }
}

export default {
    env,
    mock: true,
    ...EnvConfig[env]
}