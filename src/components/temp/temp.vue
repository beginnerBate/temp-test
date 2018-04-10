<template>
  <div class="temp">
    <div class="temp-search">
      <h1>查询条件</h1>
      <div class="temp-search-wrapper">
        <div class="temp-search-row"><label>病房号</label><input class="input" type="text" v-model="wardNumber"></div>
        <div class="temp-search-row"><label>床号</label><input class="input" type="text" v-model="bedNumber"></div>
        <div class="temp-search-row"><label>温度值</label><input class="input" type="text"></div>
        <div class="temp-search-row">
          <label>开始时间</label>
          <datetime v-model="startTime" format='YYYY-MM-DD H:i:s'></datetime>
        </div>
        <div class="temp-search-row">
          <label>结束时间</label>
          <datetime v-model="endTime" format='YYYY-MM-DD H:i:s' value='0'></datetime>
        </div>
        <div class="temp-search-row"><span class="btn btn-search" @click="findData"><i class="fa fa-search"></i>查询</span></div>
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
              <!-- <th>序号</th> -->
              <th>序号</th>
              <th>病区</th>
              <th>病房号</th>
              <th>床号</th>      
              <th>设备名称</th>
              <th>温度值(℃)</th>
              <th>监测时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{item.temperatureId}}</th>
              <th>{{item.inpatientAreaName}}</th>
              <th>{{item.wardNumber}}</th>
              <th>{{item.bedNumber}}</th>
              <th>{{item.deviceName}}</th>
              <th>{{item.temperatureValue}}</th>
              <th>{{item.recordTime | formatDate}}</th>
              <!-- <th v-for="(item,index) in item" :key="index">{{item}}</th> -->
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {getTemp} from 'api/getTemp'
import Page from 'base/page/page'
import {formatDate} from 'api/data'
import Datetime from 'vuejs-datetimepicker'
  export default {
    data () {
      return {
        page:1,
        row: 10,
        total: 0,
        bedNumber:'',
        wardNumber:'',
        inpatientAreaCode:'001',
        startTime:'',
        endTime:'',
        tableData: []
      }
    },
    filters:{
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    components: {
      Page,
      Datetime
    },
    methods: {
      pagechange (value) {
        this.page = value
        this.getTempData()
      },
      findData(){
        this.page = 1
      this.getTempData()
      },
      getTempData () {
        let mydata = {
          rows:this.row,
          page:this.page,
          inpatientAreaCode:this.inpatientAreaCode,
          bedNumber: this.bedNumber,
          wardNumber: this.wardNumber,
          startTime: this.startTime,
          endTime: this.endTime
          }
        getTemp(mydata).then((data) => {
          console.log(data.data)
          // console.log(data.data.data)
          if( data.code == '200') {
            this.total = data.total
            this.tableData = data.data

          }
        })
      },
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = ['序号', '病区', '病房号', '床号', '设备名称','温度值','监测时间'];
      　　　　const filterVal = ['temperatureId', 'inpatientAreaName', 'wardNumber','bedNumber','recordTime','temperatureValue', 'recordTime'];
      　　　　const list = this.tableData;
      　　　　const data = this.formatJson(filterVal, list);
      　　　　export_json_to_excel(tHeader, data, '列表excel');
      　　})
      },
      formatJson(filterVal, jsonData) {
      　　return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },
    created () {
      this.getTempData()
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getTempData()
      },
    },
  }
</script>

<style scoped>

</style>