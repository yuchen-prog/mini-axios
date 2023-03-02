
const toString = Object.prototype.toString

export function isDate(val: any) : val is Date{
    return toString.call(val) === '[object Date]'
}

export function isObject(val: any): boolean {
    return val !== null && typeof val === 'object'
}

// 判断是否是普通的json对象
export function isPlainObject(val: any) : val is Object{
    return toString.call(val) === '[object Object]'
}