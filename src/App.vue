<template>
  <div id="app">
    <t-header v-if="isHead"></t-header>
    <router-view/>
  </div>
</template>
<script>
import THeader from 'components/t-header/t-header'
export default {
  name: 'App',
  components: {
    THeader
  },
  data() {
    return {
      isHead: false
    }
  },
  watch: {
    $route(newValue, oldValue) {
      if(this.$route.name == 'login'){
        this.isHead = false
      }else {
        this.isHead = true
      }
    }
  },
}
</script>
<style lang="stylus">
  @import '~common/stylus/app.styl'
</style>

