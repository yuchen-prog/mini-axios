// 用于处理body的数据

import { isPlainObject } from "./util";

export function transformRequestData(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

// 处理响应的data: "{"a":1,"b":2}"之类的转为json

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  }

  return data;
} 