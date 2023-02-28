import { AxiosRequestConfig } from "./types";
import xhr from './core/xhr'
import { buildUrl } from "./helper/url";

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


function processConfig(config: AxiosRequestConfig) {
    config.url = transformUrl(config);
}

function transformUrl(config: AxiosRequestConfig) {
    const { url, params } = config;
    return buildUrl(url, params);
}

