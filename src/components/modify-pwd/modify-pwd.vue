<template>
  <div class="modify">
    <div class="modify-title">
      <h1>修改密码</h1>
      <div class="modify-form">
        <div>
          <input type="password" class="input" placeholder="请输入原密码" v-model="password.value">
          <span class="login-info-errors" v-if="password.verify">请输入密码</span>
          <span class='login-info-errors' v-if="verify">密码错误</span>
        </div>
        <div>
          <input type="password" class="input" placeholder="请输入新密码" v-model="newPwd.value">
           <span class='login-info-errors' v-if="newPwd.verify">请输入新密码</span>
          </div>
        <div>
          <input type="password" class="input" placeholder="请确认新密码" v-model="secondPwd.value">
          <span class='login-info-errors' v-if="secondPwd.verify">两次密码不一致</span>
          </div>
        <div><span class="btn btn-search" @click="modify()">确认修改</span></div>
                      <!-- loading -->
        <div v-show="isLogin" class="loading-container">
          <loading title=""></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        isLogin: true,
        verify: false,
        password:{
          value:'',
          verify:false
        },
        newPwd:{
          value:'',
          verify:false
        },
        secondPwd:{
          value:'',
          verify:false
        }
      }
    },
    watch: {
      verify(newValue, oldValue) {
        
      }
    },
    components:{
      Loading
    },
    methods: {
      modify() {
        this.isLogin = false
        if (!this.password.value){
          this.password.verify = true
           return
        }else {
          this.password.verify = false
        }
        if (!this.newPwd.value){
          this.newPwd.verify = true
          return
        }else {
          this.newPwd.verify = false
          
        }
        if (!this.secondPwd.value){
          this.secondPwd.verify = true
           return
        }else {
          this.secondPwd.verify = false
         
        }
        if (this.secondPwd.value != this.newPwd.value){
          this.secondPwd.verify = true
           return
        }else{
          this.secondPwd.verify = false
        }
        // 提交数据
         this.isLogin = true
      }
    },
  }
</script>

<style scoped>

</style>