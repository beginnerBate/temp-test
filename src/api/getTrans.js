import axios from 'axios'
import {BASEURL} from './config'
export function getTrans (data) {
  let url = BASEURL+'infusionMonitors'
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