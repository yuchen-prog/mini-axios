import { AxiosRequestConfig } from "./types";
import xhr from './core/xhr'

export default function axios(config: AxiosRequestConfig) {
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