import axios from 'axios'
import {getUrl,param} from './config'
export function toLogin (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL+'login'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return axios.post(url).then((res) => {
      return Promise.resolve(res.data)
    },(err)=>{
      return Promise.reject(err)
    })
  })
}
