import axios from 'axios'
import loS from '@/common/js/loStorage'
import {BASEURL} from './config'
axios.defaults.headers.token = loS.getItem('token',true)
export function getDevice (data) {
  let url = BASEURL + 'devices'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.get(url,{
    headers:{
      token: loS.getItem('token', true)
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function addDevice (data) {
  let url = BASEURL + 'devices'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.post(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function editDevice (deviceId,data) {
  let url = BASEURL + 'devices/'+ deviceId
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.put(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function removeDevice (deviceId,data) {
  let url = BASEURL + 'devices/' + deviceId
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.delete(url).then((res) => {
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