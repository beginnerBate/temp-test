<template>
  <div class="adress">
   <div class="adress-new">
     <h1>设置设备位置</h1>
     <div class="flexbox">
       <div><label for="id">选择设备号</label><input type="text" class="input"></div>
       <div><label for="id">选择房间号</label><input type="text" class="input"></div>
       <div><label for="id">选择床号</label><input type="text" class="input"></div>
       <div><span class="btn btn-search">确定</span></div>
     </div>
   </div>
   <div class="adress-admin">
      <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>房间号</th>
              <th>设备号</th>
              <th>床号</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <th v-for="(item,index) in item" :key="index">{{item}}</th>
              <th><span>删除</span><span>修改</span></th>
            </tr>
          </tbody>
        </table>
   </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [
          {"id":1, "roomId":'001','deviceId':'001','time':'2014-5-6 12:00',},
          {"id":2, "roomId":'001','deviceId':'002','time':'2014-5-6 12:00',},
          {"id":3, "roomId":'001','deviceId':'003','time':'2014-5-6 12:00',},
          {"id":4, "roomId":'001','deviceId':'004','time':'2014-5-6 12:00',},
          {"id":5, "roomId":'002','deviceId':'005','time':'2014-5-6 12:00',},
          {"id":6, "roomId":'002','deviceId':'006','time':'2014-5-6 12:00',},
          {"id":7, "roomId":'002','deviceId':'007','time':'2014-5-6 12:00',},
          {"id":8, "roomId":'002','deviceId':'008','time':'2014-5-6 12:00',},
          {"id":9, "roomId":'001','deviceId':'009','time':'2014-5-6 12:00'},
          {"id":10, "roomId":'001','deviceId':'001','time':'2014-5-6 12:00'},
          {"id":11, "roomId":'001','deviceId':'001','time':'2014-5-6 12:00'},
          {"id":12, "roomId":'001','deviceId':'001','time':'2014-5-6 12:00'}
          ]
      }
    }
  }
</script>

<style scoped>

</style>