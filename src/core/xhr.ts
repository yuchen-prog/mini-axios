import { AxiosRequestConfig } from '../types'


// 利用XMLHttpRequest 发送请求
export default function xhr(config: AxiosRequestConfig) {

    const { url, method = 'get', data = null, params } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);

    request.send(data);
}