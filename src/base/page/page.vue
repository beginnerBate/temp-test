<template>
  <nav>
    <ul class="page">
      <li :class="{'disabled': current ==1}"><a href="javascript:;" @click="setCurrent(current -1)"><i class="fa fa-angle-double-left"></i></a></li>
      <li :class="{'disabled': current ==1}"><a href="javascript:;" @click="setCurrent(1)">首页</a></li>
      <li v-for="(p, index) in grouplist" :key="index" :class="{'active': current == p.val}">
        <a href="javascript:;" @click="setCurrent(p.val)">{{p.text}}</a>
      </li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)">尾页</a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current +1)"><i class="fa fa-angle-double-right"></i></a></li>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      current: this.currentPage
    }
  },
  props: { // 数据总条数
    total: {
      type: Number,
      default: 0
    },
    display: {  //  每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {  //  当前页码
      type: Number,
      default: 1
    },
    pagegroun: {  //  分页条数
      type: Number,
      default: 5,
      coerce: function (v) {
        v = v > 0 ? v : 5
        return v % 2 === 1 ? v : v + 1
      }
    }
  },
  computed: {
    page() { //  总页数
      return Math.ceil(this.total / this.display )
    },
    grouplist () {
      // 获取分页页码
      let len = this.page
      let temp = []
      let list = []
      let count = Math.floor(this.pagegroun/2)
      let center = this.current
      if (len <= this.pagegroun) {
        while (len--) {
          temp.push({text: this.page - len, val: this.page - len})
        }
        return temp
      }
      while(len--) {
        temp.push(this.page - len)
      }
      // console.log(temp,center,temp.indexOf(center))
      var idx = temp.indexOf(center)
      if (idx < count ){
        center = center + count - idx
      }
      if ( this.current > this.page - count) {
         center = this.page - count
      }
      temp = temp.splice(center- count -1,this.pagegroun)
      do {
        let t = temp.shift()
        list.push({
          text: t,
          val: t
        })
      } while (temp.length)
      if(this.page > this.pagegroun) {
        this.current > count+1 ? (list.unshift({text:'...',val: list[0].val-1})): ''
        this.current < this.page - count ? list.push({text:'...',val: list[list.length -1].val+1}) :''
      }
      return list
    }
  },
  methods: {
    setCurrent (idx) {
      if (this.current != idx && idx>0 && idx < this.page+1) {
        this.current = idx
        this.$emit('pagechange', this.current)
      }
    }
  },
}
</script>
<style lang="stylus" scoped>
.page
  overflow hidden
  display table
  margin 0
  height 50px
  li
    float left
    height 35px
    border-radius 5px
    margin 6px
    color #666
    a
      display block
      width  30px
      height 30px
      text-align center 
      line-height 30px
      font-size 12px
      border-radius 5px
      text-decoration none 
  li:hover
    background #398dee
    a
      color: #ffffff
.active
  background #398dee
  color: #ffffff 
  a
    color: #ffffff
</style>


