// import axios from 'axios'
import {getUrl,Axios,param} from './config'
export function getTemp (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL+'temperatures'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.get(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}
