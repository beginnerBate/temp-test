import axios from 'axios'
// import loS from '@/common/js/loStorage'
import {getUrl,param,Axios} from './config'

export function getDevice (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devices'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.get(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
export function addDevice (data) { 
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devices'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.post(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
export function editDevice (deviceId,data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devices/'+ deviceId
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.put(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
export function removeDevice (deviceId,data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL + 'devices/' + deviceId
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.delete(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}