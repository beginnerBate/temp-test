<template>
  <div class="right-menu">
    <ul class="r-m-list">
      <router-link v-for="(item,index) in menuData" :key="index" tag="li" :to="item.url" class="r-m-list-item">
        <i class="fa" :class="item.icon"></i>
        <span>{{item.name}}</span>
        <!-- <i v-if="item.children" class="fa fa-caret-right"></i> -->
        <ul v-if="item.children" class="r-m-list-child">
          <router-link tag="li" class="r-m-list-child-item" v-for="(item,index) in item.children" :key="index" :to="item.url">
          <i class="fa" :class="item.icon"></i>
          <span>{{item.name}}</span>
          </router-link>
        </ul>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData:[
        {
          name: '体温数据查询',
          url: '/home/temp',
          icon: 'fa-thermometer'
        },
        {
          name: '设备管理',
          url: '/home/device',
          icon: 'fa-gavel'
        },
        {
          name:'设备位置管理',
          url:'/home/place',
          icon:'fa-gavel'
        },
        {
          name: '系统设置',
          url: '/home/set',
          icon: 'fa-cog',
          children:[
            {
              name: '修改密码',
              icon: 'fa-pencil',
              url:'/home/set/modify'
            }
          ]
        },
      ]
    }
  }
}
</script>

