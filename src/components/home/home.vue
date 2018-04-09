<template>
  <div class="home">
    <!-- 左侧导航 -->
    <div class="home-right">
      <right-menu></right-menu>
    </div>
    <!-- 右侧内容 -->
    <div class="home-left">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import RightMenu from 'components/right-menu/right-menu'
  export default {
    components: {
      RightMenu
    }
  }
</script>