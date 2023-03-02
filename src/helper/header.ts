import { isPlainObject } from "./util";


function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return
    }
    Object.keys(headers).forEach(name => {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[name];
            delete headers[name];
        }
    })
}

export function processHeaders(headers: any, data: any) {
    normalizeHeaderName(headers, 'Content-Type');
    // 如果data是普通的json，且未指定具体的header，手动为其赋值
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8'
        }
    }
    return headers;
}