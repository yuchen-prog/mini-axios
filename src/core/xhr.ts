import { AxiosRequestConfig } from '../types'


// 利用XMLHttpRequest 发送请求
export default function xhr(config: AxiosRequestConfig) {

    const { url, method = 'get', data = null, params, headers } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);

    // 处理header
    Object.keys(headers).forEach((name) => {
        if (data === null && name.toLowerCase() === 'content-type') {
            delete headers[name]
        } else {
            request.setRequestHeader(name, headers[name])
        }
    })

    request.send(data);
}