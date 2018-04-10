<template>
  <div class="adress">
   <div class="adress-new">
     <h1>设置设备位置</h1>
     <div class="flexbox">
       <div>
         <label for="id">选择设备号</label>
         <v-select :list='roomList'></v-select>
         </div>
       <div>
         <label for="id">选择房间号</label>
         <v-select :list='roomList'></v-select>
       </div>
       <div>
         <label for="id">选择床号</label>
          <v-select :list='roomList'></v-select>
       </div>
       <div style="margin-top: 26px"><span class="btn btn-search">确定</span></div>
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
          <tfoot>
            <tr>
              <td colspan="5"><page :total="total" :current-page="current" @pagechange='pagechange'></page></td>
            </tr>
          </tfoot>
        </table>
   </div>
  </div>
</template>
<script>
import {getRoom} from 'api/get-adress.js'
import VSelect from 'base/v-select/v-select'
import Page from 'base/page/page'
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
          ],
          roomList: '',
          total: 150,
          display:10,
          current: 1
      }
    },
    components: {
      VSelect,
      Page
    },
    created () {
      this.getRoomList()
    },
    methods: {
      getRoomList() {
        getRoom().then((data)=>{
          if (data.code === 0){
            this.roomList = data.room
            console.log(this.roomList)
          }
        })
      },
      pagechange (currentPage) {
        console.log(currentPage)
      }
    },
  }
</script>

<style scoped>

</style>