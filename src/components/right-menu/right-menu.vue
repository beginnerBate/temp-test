<template>
  <div class="right-menu">
    <ul class="r-m-list">
      <!-- start导航优化可折叠 -->
        <template v-for="(item, index) in menuData">
          <router-link v-if="item.url" :key="index" tag="li" :to="item.url" class="r-m-list-item">
            <i class="fa" :class="item.icon"></i>
            <span>{{item.name}}</span>
          </router-link>
          <li v-else :key="index" class="r-m-list-item">
            <div class="r-m-list-item-title" @click="flod(index)">
              <i class="fa" :class="item.icon"></i>
              <span>{{item.name}}</span>
              <i class="fa" :class="{'fa-angle-down':index == i,'fa-angle-right': index!=i}"></i>
            </div>
            <!-- <i v-if="item.children" class="fa fa-caret-right"></i> -->
            <ul v-if="item.children" class="r-m-list-child" :class="{'active-menu':index ==i}">
              <router-link tag="li" class="r-m-list-child-item" v-for="(item,index) in item.children" :key="index" :to="item.url">
              <i class="fa" :class="item.icon"></i>
              <span>{{item.name}}</span>
              </router-link>
            </ul>
          </li>
        </template>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      i:-1,
      menuData:[
        {
          name: '设备管理',
          url: '/home/device',
          icon: 'fa-gavel'
        },
        {
          name:'位置管理',
          url:'/home/place',
          icon:'fa-location-arrow'
        },
        {
          name:'数据查询',
          icon:'fa-database',
          children:[
               {
                 name: '体温数据查询',
                 url:'/home/temp'
               },
               {
                 name: '输液监控数据',
                 url: '/home/trans'
               },
               {
                 name:'输液报警数据',
                 url:'/home/alarm'
               }
          ]
        },
        {
          name: '系统设置',
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
  },
  methods: {
    flod(index) {
      this.i = index
      // let ele = event.target.querySelector('angle')
      
    }
  },
}
</script>

