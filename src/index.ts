import { AxiosRequestConfig } from "./types";
import xhr from './core/xhr'
import { buildUrl } from "./helper/url";
import { transformRequestData } from "./helper/data";
import { processHeaders } from "./helper/header";

export default function axios(config: AxiosRequestConfig) {
    processConfig(config);
    xhr(config)
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

