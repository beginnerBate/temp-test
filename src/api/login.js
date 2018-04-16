import axios from 'axios'
import {BASEURL} from './config'
export function toLogin (data) {
  let url = BASEURL+'login'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.post(url).then((res) => {
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