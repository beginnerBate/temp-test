<template>
  <!-- !这里设置了选中后的radio样式类,和 禁用后的样式类 -->
  <label class="t-radio" :class="{'checked':model==value,'disabled':disabled}">
    <input type="radio" ref="radio" :value="value" @click="updateVal" :disabled="disabled">
  </label>
</template>
<script>
export default {
  name:'t-radio',
  model: {
    // 自定义v-model的prop 和event,这个定义的意思就是使用change事件来更新model的值
    prop: 'model',
    event: 'change'
  },
  props: {
    value: {
      type: [String,Number],
      require: true
    },
    model: {
      // 这里的model指的是上面定义的v-model的prop
      type: [String, Number],
      require: true
    },
    checked: {
      // 是否默认选中
      type: Boolean,
      default: false
    },
    disabled: {
      //  是否禁用
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.checked === true) {
      this.updateVal()
    }
  },
  methods: {
    updateVal () {
      this.$emit('change', this.$refs.radio.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.t-radio
  width 16px
  height 16px
  border-radius 50%
  display inline-block
  border: 1px solid #d4d4d4;
  position relative
  cursor pointer
.t-radio.disabled
  border-color #cccccc
.t-radio::after
  content ''
  width 10px
  height 10px
  border-radius 50%
  display inline-block
  position absolute 
  left 50%
  top 50%
  margin -5px 0 0 -5px
  background-color #4693fe
  transition all 0.5s ease 
  opacity 0
  transform scale(0)
.t-radio.disabled::after
  background-color #ccc
.t-radio.checked::after
  opacity 1
  transform scale(1)
.t-radio input[type=radio]
  opacity 0
  margin 0
  cursor pointer
</style>

