<template>
  <div class="login">
    <header class="login-header">医疗护理智能监测系统</header>
    <div class="login-wrapper">
      <div class="login-content">
        <form class="login-form" @submit.prevent="onSubmit">
          <div class="login-form-row">
            <!-- <label for="username">用户名</label> -->
            <input type="text" name="username" id="username" placeholder="用户名" v-model="loginform.username.value">
          </div>
          <div class="login-form-row">
            <!-- <label for="password">密码</label> -->
            <input type="password" placeholder="密码" v-model="loginform.password.value">
          </div>
          <button class="btn btn-submit">登录</button>
          <div class="login-errors">
            <span class="login-info-errors" v-if="verify">账号或密码错误</span>
            <span class="login-info-errors" v-if="loginform.username.verify">请输入用户名</span>
            <span class="login-info-errors" v-if="loginform.password.verify">请输入密码</span>
          </div>
        </form>
        <!-- loading -->
        <div v-show="isLogin" class="loading-container">
          <loading title=""></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toLogin} from 'api/login.js'
import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        loginform: {
          username:{
            verify:false,
            value:''
          },
          password:{
            verify: false,
            value:''
          }
        },
        verify: false,
        isLogin: false
      }
    },
    components:{
      Loading
    },
    watch: {
      'verify'(newValue, oldValue) {
        
      }
    },
    created (){
      this.$store.commit('setLogin','')
      this.$store.commit('changeheadText','')  
      this.$store.commit('setToken','')  
    },
    methods: {
      onSubmit() {
        this.isLogin = false
        let data = {}
        if (this.loginform.username.value){
          data.username = this.loginform.username.value
          this.loginform.username.verify = false
        }else{
          this.loginform.username.verify = true
          return
        }
        if (this.loginform.password.value){
          data.password = this.loginform.password.value
          this.loginform.password.verify = false
        }else{
          this.loginform.password.verify = true
          return
        }
        data.exp = 1
      this.isLogin = true
      // 提交数据
      toLogin(data).then((res)=>{
          if(res.code == '200') {
            this.verify = false
            this.isLogin = false
            this.$store.commit('setLogin','login')
            this.$store.commit('changeheadText',res.inpatientAreaName)
            this.$store.commit('setToken',res.token)
            this.$router.push('/home')
          }else if(res.data.code == -1){
           this.verify = true
           this.isLogin = false
          }
      }).catch((err) => {
          console.log(err)
          this.isLogin = false
      })
      }
    },
  }
</script>

<style scoped>

</style>