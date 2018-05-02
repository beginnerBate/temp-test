// import axios from 'axios'
import {getUrl,Axios,param} from './config'
export function updatePassword (data) {
  return getUrl().then((BASEURL)=>{
    let url = BASEURL+'updatePassword'
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return Axios.patch(url).then((res) => {
      return Promise.resolve(res.data)
    })
  })
}