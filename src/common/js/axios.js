import axios from 'axios'
import loS from '@/common/js/loStorage'
export default function Axios () {
   return axios.create({
    baseURL: 'http://192.168.0.100/mcim-webservice',
    timeout: 1000,
    headers: {'token': loS.getItem('token',true)}
   })
}