import axios from 'axios'
export function toLogin (data) {
  let url = 'https://www.easy-mock.com/mock/5ac9c075d4c08a6a0df5407a/temp/login'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return axios.post(url,data).then((res) => {
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