<template>
  <div class="message-box-wrapper">
    <div class="message-box">
      <div class="message-box-header">
        <h1>{{title}}</h1>
        <div><span class="fa fa-close" @click="hide()"></span></div>
      </div>
      <div class="message-box-section">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default:''
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  },
}
</script>


<style lang="stylus" scoped>
.message-box-wrapper
  position fixed
  top 0 
  right 0
  bottom 0
  left 0
  background-color rgba(0,0,0,0.5)
  text-align center 
  font-size 0
  white-space nowrap
  overflow auto
.message-box-wrapper:after
  content ''
  display inline-block
  height 100%
  vertical-align middle
.message-box
  display inline-block
  vertical-align middle 
  text-align left 
  font-size 14px
  white-space normal
  width 758px
  height 569px
  background #ffffff
.message-box-header
  display flex
  justify-content space-between
  align-items center 
  height 40px
  background #398dee
  h1
    color #ffffff
    padding-left 20px
    font-size 16px
    letter-spacing 2px
    font-weight 600
  div
    color #dedede
    cursor pointer
    font-size 18px
    padding 10px
  div:hover
    color #ffffff
</style>


