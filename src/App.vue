<template>
  <div id="app">
    <t-header v-if="$store.state.isLogin"></t-header>
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
  computed:{
    page(){
      
    }
  }
}
</script>
<style lang="stylus">
  @import '~common/stylus/app.styl'
</style>

