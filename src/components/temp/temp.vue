<template>
  <div class="temp">
    <div class="temp-search">
      <h1>查询条件</h1>
      <div class="temp-search-wrapper">
        <div class="temp-search-row"><label>房间号</label><input class="input" type="text"></div>
        <div class="temp-search-row"><label>床号</label><input class="input" type="text"></div>
        <div class="temp-search-row"><label>温度值</label><input class="input" type="text"></div>
        <div class="temp-search-row"><label>时间日期</label><input class="input" type="data"></div>
        <div class="temp-search-row"><span class="btn btn-search"><i class="fa fa-search"></i>查询</span></div>
      </div>
    </div>
    <div class="temp-table">
      <div class="temp-table-header"> 
        <h1 @click="export2Excel()"><i class="fa fa-download"></i> 导出数据</h1>
      </div>
      <div class="temp-table-content">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>房间号</th>
              <th>设备号</th>
              <th>温度值</th>
              <th>检测时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <th v-for="(item,index) in item" :key="index">{{item}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page:1,
        pageSize: 12,
        total: 0,
        tableData: [
          {"id":1, "roomId":'001','deviceId':'001','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":2, "roomId":'001','deviceId':'002','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":3, "roomId":'001','deviceId':'003','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":4, "roomId":'001','deviceId':'004','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":5, "roomId":'002','deviceId':'005','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":6, "roomId":'002','deviceId':'006','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":7, "roomId":'002','deviceId':'007','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":8, "roomId":'002','deviceId':'008','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":9, "roomId":'001','deviceId':'009','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":10, "roomId":'001','deviceId':'001','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":11, "roomId":'001','deviceId':'001','temp':'36.4','time':'2014-5-6 12:00','status':'正常'},
          {"id":12, "roomId":'001','deviceId':'001','temp':'36.4','time':'2014-5-6 12:00','status':'正常'}
          ]
      }
    },
    methods: {
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = ['序号', '房间号', '设备号', '温度值', '监测时间','状态'];
      　　　　const filterVal = ['id', 'roomId', 'deviceId', 'temp', 'time','status'];
      　　　　const list = this.tableData;
      　　　　const data = this.formatJson(filterVal, list);
      　　　　export_json_to_excel(tHeader, data, '列表excel');
      　　})
      },
      formatJson(filterVal, jsonData) {
      　　return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
  }
</script>

<style scoped>

</style>