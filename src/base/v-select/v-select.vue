<template>
  <div class="v-select">
    <input type="text" v-model="sData" @click='listShow = !listShow' class="input">
    <div v-show="listShow" class="v-select-list" ref="selectWrapper">
      <ul>
        <li v-for="(item,index) in list " :value="index" @click="onItemclick(index)" :key="index">{{item}}</li>
      </ul>
    </div>  
  </div>
</template>
<script>
// import Bscroll from 'better-scroll'
export default {
  props:['list'],
  data () {
    return {
      sData: this.list[0],
      listShow: false,
    }
  },
  methods: {
    onItemclick(value) {
      this.sData = this.list[value]
      this.$emit('selectItem',this.list[value])
      this.listShow = false
    }
  },
  created(){
    // console.log(this.list)
  },
  mounted () {
    // this.$nextTick(()=>{
    //   this.scroll = new Bscroll(this.$refs.selectWrapper, {
    //         click:true
    //     })
    // })
  }
}
</script>
<style lang="stylus" scoped>
.v-select
  margin-top: 12px;
.v-select-list
  width 100%
  height 200px
  overflow-y auto
  background #ffffff
  border 1px
  margin-top 4px
  box-sizing border-box
  border-radius 8px
  border: 1px solid;
  border-color: #d6d6d6;
.v-select-list ul
  width 100%
  li
    height 36px
    line-height 36px
    color #393939
    border-bottom: 1px solid #e2e2e2
    padding-left 20px
    cursor pointer
  li:hover
    background-color: #eaeaea
    color: #398dee
</style>


