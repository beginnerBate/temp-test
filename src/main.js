// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import 'font-awesome/css/font-awesome.css'
import 'common/stylus/index.styl'
promise.polyfill()
Vue.config.productionTip = false
Vue.use(HappyScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
