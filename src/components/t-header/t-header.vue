<template>
  <div class="header">
    <h1>医疗护理智能监测系统</h1>
    <div class="header-right">
      <h3>{{$store.state.headText}}</h3>
      <a title="退出登录" @click="singOut"><i class="fa fa-sign-out"></i></a>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.header
  display flex
  justify-content space-between
  align-items center
.header-right
  display flex
.header a
  color #fdfdfd
  font-size 18px
  cursor pointer
  margin-left 20px
.header a:hover
  color #ffffff
</style>
<script>
export default {
  methods: {
    singOut() {
      this.$router.push('/login')
    }
  },
}
</script>



