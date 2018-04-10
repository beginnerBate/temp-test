
import axios from 'axios'
export function getTemp (data) {
  // let url = 'http://192.168.0.100:8080/mcim-webservice/temperatures?inpatientAreaCode=001&wardNumber=401&bedNumber=2&rows=10&page=1'
  let url = 'http://192.168.0.100:8080/mcim-webservice/temperatures'
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