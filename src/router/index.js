import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由懒加载
import Login from 'components/login/login'
import Home from 'components/home/home'
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      component: Login
    },
    {
      path:'/home',
      component: Home
    }
  ]
})
