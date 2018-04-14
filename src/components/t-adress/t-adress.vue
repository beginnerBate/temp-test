<template>
  <div class="adress">
    <div class="temp-search">
      <h1>查询条件</h1>
      <div class="temp-search-wrapper">
        <div class="temp-search-row">
          <label>病房号</label>
          <input class="input" type="text" v-model="wardNumber">  
        </div>
        <div class="temp-search-row">
          <label>床号</label>
          <input class="input" type="text" v-model="bedNumber">
        </div>
        <div class="temp-search-row">
          <label>设备号</label>
          <input class="input" type="text" v-model="deviceCode">
        </div>
        <div class="temp-search-row" style="margin-top: 26px;"><span class="btn btn-search" @click="findData"><i class="fa fa-search"></i>查询</span></div>
      </div>
    </div>
        <div class="temp-table">
      <div class="temp-table-header"> 
        <h1>
          <span  @click="export2Excel()"><i class="fa fa-download"></i> 导出数据</span>
          <span class="btn-add"><i class="fa fa-plus"></i> 新增设备位置</span>
          </h1>
      </div>
      <div class="temp-table-content">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>设备号</th>
              <th>设备名称</th>
              <th>病房号</th>
              <th>床号</th>
              <th>病区</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if="onData"><th colspan="7" class="no-data">没有相关数据</th></tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{item.devicePositionId}}</th>
              <th>{{item.deviceCode}}</th>
              <th>{{item.deviceName}}</th>
              <th>{{item.wardNumber}}</th>
              <th>{{item.bedNumber}}</th>
              <th>{{item.inpatientAreaName}}</th>
              <th><span>删除</span><span>修改</span></th>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="6"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
              <td colspan="1" class="item-switch-re">
                <div class="item">
                  <span class="item-label btn-refresh" @click="refreshTable()">刷新</span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <!-- loading -->
        <div v-show="isloading && !total" class="loading-container">
          <loading title=""></loading>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getLocation} from 'api/get-adress'
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        page:1,
        row: 10,
        total: 0,
        wardNumber:'', // 病房号
        bedNumber:'',     // 床号
        deviceCode:'',  //  设备号
        tableData: [],
        isloading:false,
        onData:'',
        options:[
          {text:'输液监控器',value:'01'},
          {text:'体温计',value:'03'},
        ]
      }
    },
    components: {
      Page,
      Loading
    },
    methods: {
      pagechange (value) {
        this.page = value
        this.getDeviceData()
      },
      // 刷新表格
      refreshTable(){
        this.page = 1
        this.wardNumber = ''
        this.bedNumber = ''
        this.deviceCode = ''
        this.getLocationData()
      },
      // 查询表格
      findData () {
        this.page = 1
        this.getLocationData()
      },
      getLocationData () {
        this.isloading = true
        let mydata = {
          rows: this.row,
          page: this.page,
          wardNumber: this.wardNumber,
          bedNumber: this.bedNumber,
          deviceCode: this.deviceCode
          }
        getLocation(mydata).then((data) => {
         this.isloading = false
         console.log(data)
          if( data.code == '200') {
            this.total = data.total
            this.tableData = data.data
            this.onData = false
          }else if (data.code == '404'){
            this.onData = true
            this.total = 0
            this.tableData = []
          }
        }).catch((err)=>{
          console.log(err)
          this.isloading = false
        })
      },
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = ['序号', '设备号', '设备名称', '病房号', '床号','病区'];
      　　　　const filterVal = ['devicePositionId', 'deviceCode', 'deviceName','wardNumber','bedNumber','inpatientAreaName'];
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
      this.getLocationData()
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getLocationData()
      }
    }
  }
</script>