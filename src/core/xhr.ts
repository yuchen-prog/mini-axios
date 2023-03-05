import { AxiosRequestConfig, AxiosResponse } from '../types'


// 利用XMLHttpRequest 发送请求
export default function xhr(config: AxiosRequestConfig) {

    return new Promise((resolve) => {
        const { url, method = 'get', data = null, params, headers, responseType } = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        request.open(method.toUpperCase(), url, true);

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }
            const responseHeaders = request.getAllResponseHeaders();
            const responseData = responseType && responseType !== 'text'
                ? request.response : request.responseText;

            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }

            resolve(response);
        }

        // 处理header
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        request.send(data);
    })

}