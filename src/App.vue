<template>
  <div id="app">
    <t-header></t-header>
    <router-view/>
  </div>
</template>
<script>
import THeader from 'components/t-header/t-header'
export default {
  name: 'App',
  components: {
    THeader
  }
}
</script>
<style lang="stylus">
  @import '~common/stylus/app.styl'
</style>

