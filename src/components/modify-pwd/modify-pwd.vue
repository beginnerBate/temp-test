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
        <!-- notice -->
        <v-notice v-if="notice.type" :type="notice.type" :info="notice.info"></v-notice>
      </div>
    </div>
  </div>
</template>

<script>
import {updatePassword} from 'api/updatePassword'
import VNotice from 'base/v-notice/v-notice'
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
        },
        notice:{
          type:'',
          info:'',
        },
      }
    },
    watch: {
      verify(newValue, oldValue) {
      }
    },
    components:{
      VNotice
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
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        let that = this
         updatePassword({oldPassword: this.password.value,newPassword:this.secondPwd.value}).then((res)=>{
          if (res.code == '200') {
            that.notice.type = 'success'
            that.notice.info = '修改成功'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.$router.push('/login')         
            },1000)
          } 
          if (res.code == '400') {
            that.notice.type = 'error'
            that.notice.info = '修改失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)
          }
           }).catch((err)=>{
            that.notice.type = 'error'
            that.notice.info = '修改失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)             
           })
      }
    },
  }
</script>

<style scoped>

</style>