import { isDate, isObject } from "./util";

/**
 * task: 实现url的拼接
 * 处理普通参数，数组，对象，Date，特殊字符，null忽略，丢弃哈希
 */


function encode(val: string): string {
    // 对url进行编码并将不需要替换的字符替换回来
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
    if (!params) {
        return url
    }

    const parts: string[] = [];

    Object.keys(params).forEach((key) => {
        let val = params[key];

        // 忽略空值
        if (val === null || typeof val === 'undefined') {
            return
        }

        let values: string[];
        // 数组情形 /base/get?foo[]=bar&foo[]=baz'
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        } else {
            values = [val];
        }

        values.forEach((val) => {
            if (isDate(val)) {
                val = val.toISOString();
            } else if (isObject(val)) {
                val = JSON.stringify(val)
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
    })

    let serializedParams = parts.join('&');

    // 丢弃哈希标记
    if (serializedParams) {
        const hashIndex = url.indexOf('#');
        if (hashIndex !== -1) {
            url = url.slice(0, hashIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url;
}