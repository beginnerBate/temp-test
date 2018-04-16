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
      isHead: this.$store.state.isLogin
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.isHead = this.$store.state.isLogin
    }
  },
}
</script>
<style lang="stylus">
  @import '~common/stylus/app.styl'
</style>

