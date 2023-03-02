// 用于处理body的数据

import { isPlainObject } from "./util";

export function transformRequestData(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}