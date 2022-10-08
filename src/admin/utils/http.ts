/**
 * axios二次封装
 */
import axios from 'axios'
import qs from 'qs'
import config from '../config'
import { ElMessage } from 'element-plus'
import router from '../router'
import pinia from '../store/pinia'
import useUserStore from '../store/modules/user'
const userStore = useUserStore(pinia)

const TOKEN_INVALID: string = 'Token认证失败，请重新登录'
const NETWORK_ERROR: string = '网络请求异常，请稍后重试'

export const CONTENT_TYPE = 'Content-Type'
export const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8'
export const APPLICATION_JSON = 'application/json; charset=UTF-8'
export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

interface optionsConfig {
    url?: string,
    data?: any,
    params?: any,
    method?: Method,
    mock?: boolean
}

// 创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
    !req.headers && (req.headers = {})
    req.headers['Zbxiang-Admin-Version'] = 'v1.1.0'
    const headers = req.headers || {}
    if (!req.headers[CONTENT_TYPE]) {
        req.headers[CONTENT_TYPE] = APPLICATION_JSON
    }
    if (req.headers[CONTENT_TYPE] === FORM_URLENCODED) {
        req.data = qs.stringify(req.data)
    }
    // const { token = "" } = storage.getItem(USER_INFO_KEY) || {}
    const token = userStore.getToken
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token
    return req
})

// 响应拦截
service.interceptors.response.use((res) => {
    const { code, msg } = res.data
    if (code === 200) {
        return res.data;
    } else if (code === 500001) {
        ElMessage.error(TOKEN_INVALID)
        setTimeout(() => {
            router.push('/login')
        }, 1500)
        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

/**
  * 请求核心函数
  * @param {*} options 请求配置
  */
 function request(options: optionsConfig) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

['get', 'GET', 'post', 'POST', 'put', 'PUT', 'delete', 'DELETE', 'patch', 'PATCH'].forEach((item) => {
    request[item] = (url?: string, data?: any, options?: any) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request