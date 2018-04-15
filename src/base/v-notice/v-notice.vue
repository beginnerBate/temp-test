<template>
  <div class="v-notice" :class="type" ref="notice">
    <div>
      <span class="fa" :class="icon"></span>
    </div>
    <h1>{{info}}</h1>
  </div>
</template>
<script>
export default {
  props:{
    info: {
      type: String,
      require: true
    },
    type: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    icon() {
      if (this.type == 'success') {
        return 'fa-check-circle'
      }
      if (this.type == 'error') {
        return 'fa-exclamation-circle'
      }
      if (this.type == 'loading') {
        return 'fa-spinner fa-spin'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.v-notice
  position fixed 
  padding 6px 50px
  background #ffffff
  text-align center
  border-radius 8px
  font-weight 600
  font-size 14px
  color #393939
  line-height 20px
  box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
  top 50%
  left 50%
  transform translate(-50%, -50%)
.v-notice.success
  span
    color green
    font-size 22px
.v-notice.error
  span
    color #f56c6c
    font-size 22px  
.v-notice.loading
  span
    color #999999
    font-size 22px  
</style>



