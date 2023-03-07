import { createError } from '../helper/error';
import { parseHeaders } from '../helper/header';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'


// 利用XMLHttpRequest 发送请求
export default function xhr(config: AxiosRequestConfig): AxiosPromise {

    return new Promise((resolve, reject) => {
        const { url, method = 'get', data = null, params, headers, responseType, timeout } = config;
        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        // 默认为0
        if (timeout) {
            request.timeout = timeout;
        }

        request.open(method.toUpperCase(), url, true);

        // 网络错误会触发onerror事件
        request.onerror = function handleError() {
            reject(createError(
                'network error!',
                config,
                null,
                request
            ))
        }

        // 超时时触发
        request.ontimeout = function handleTimeout() {
            reject(createError(
                `Timeout of ${config.timeout} ms exceeded`,
                config,
                'ECONNABORTED',
                request
            ))
        }

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return
            }

            if (request.status === 0) {
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders());
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
            // 对于非200-300之间状态码的处理
            handleResponse(response);
        }

        function handleResponse(response: AxiosResponse) {
            if (response.status >= 300 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(
                    `Request failed with status code ${response.status}`,
                    config,
                    null,
                    request,
                    response
                ))
            }
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