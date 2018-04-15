//  设备管理 json数据获取
import {BASEURL} from './config'
import axios from 'axios'
export function getLocation (data) {
  let url = BASEURL + 'devicePositions'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 提交新增位置
export function addDevicePos (data) {
  let url = BASEURL + 'devicePositions'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}