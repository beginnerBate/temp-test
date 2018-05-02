//  设备管理 json数据获取
import {getUrl,Axios,param} from './config'
import axios from 'axios'
export function getLocation (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devicePositions'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.get(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
//  根据设备号获取信息
export function devicePositions (id) {
  return getUrl('test').then((BASEURL)=>{
    let url = BASEURL + `devicePositions/${id}`
    return Axios.get(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
// 提交新增位置
export function addDevicePos (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devicePositions'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.post(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
export function editDevicePos (devicePositionId,data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devicePositions/'+ devicePositionId
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.put(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })

}
export function removeDevicePos (devicePositionId,data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devicePositions/' + devicePositionId
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.delete(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}