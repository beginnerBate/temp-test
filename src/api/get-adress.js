//  设备管理 json数据获取
import {BASEURL} from './config'
import axios from 'axios'
export function getRoom (data) {
  let url = 'https://www.easy-mock.com/mock/5ac9c075d4c08a6a0df5407a/temp/adress/room'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getLocation (data) {
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