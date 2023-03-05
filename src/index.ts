import { AxiosRequestConfig, AxiosResponse } from "./types";
import xhr from './core/xhr'
import { buildUrl } from "./helper/url";
import { transformRequestData, transformResponse } from "./helper/data";
import { processHeaders } from "./helper/header";

export default function axios(config: AxiosRequestConfig) {
    processConfig(config);
    return xhr(config).then((res) => {
        return transformResponseData(res)
    })
}


// 实现最基本的发送请求
/**
 *  axios({
 *      method: 'get',
 *      url: '/simple/get',
 *      params: {
 *          a: 1,
 *          b: 2     
 *      }
 * })
 */


/**
 * 处理配置信息的入口
 * @param config 
 */
function processConfig(config: AxiosRequestConfig) {
    config.url = transformUrl(config);
    config.headers = transformHeader(config);
    config.data = transformRequestData(config.data);
}

// 处理url参数
function transformUrl(config: AxiosRequestConfig) {
    const { url, params } = config;
    return buildUrl(url, params);
}

function transformHeader(config: AxiosRequestConfig) {
    const { headers = {}, data } = config;
    return processHeaders(headers, data)
}

// 处理服务端返回的数据，支持链式调用
// axios({...}).then((res) => {...})

// 返回的内容包括:
// 1. 数据 data
// 2. 状态码 status
// 3. 状态消息 statusText
// 4. 响应头 headers
// 5. 请求配置对象 config
// 5. 对象实例 request


function transformResponseData(res: AxiosResponse) {
    res.data = transformResponse(res.data);
    return res;
}