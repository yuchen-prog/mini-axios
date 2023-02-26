export type Method = 'get' | 'GET'
    | 'post' | 'POST'
    | 'delete' | 'DELETE'
    | 'put' | 'PUT'
    | 'options' | 'OPTIONS'
    | 'head' | 'HEAD'
    | 'patch' | 'PATCH'

/**
 * 定义一个请求参数的接口
 */
export interface AxiosRequestConfig {
    url: string,
    method?: Method,
    data?: any,
    params?: any
}