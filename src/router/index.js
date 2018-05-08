import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由懒加载
import Login from 'components/login/login'
import Home from 'components/home/home'
import Temp from 'components/temp/temp'
import Device from 'components/device/device'
import Set from 'components/set/set'
import ModifyPwd from 'components/modify-pwd/modify-pwd'
import TAdress from 'components/t-adress/t-adress'
import Trans from 'components/trans/trans'
import Alarm from 'components/alarm/alarm'


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      component: Home,
      redirect: '/home/device',
      children: [
        {
          path: 'temp',
          component: Temp
        },
        {
           path: 'device',
           component: Device
        },
        {
          path: 'place',
          component: TAdress
        },
        {
           path: 'trans',
           component:Trans
        },
        {
          path:'alarm',
          component:Alarm
        },
        {
          path: 'set',
          component: Set,
          redirect: '/home/set/modify',
          children:[
            {
              path: 'modify',
              component: ModifyPwd
            }
          ]
        }
      ]
    }
  ]
})
