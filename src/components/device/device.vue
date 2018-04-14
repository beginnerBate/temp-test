<template>
  <div class="temp">
    <div class="temp-search">
      <h1>查询条件</h1>
      <div class="temp-search-wrapper">
        <div class="temp-search-row">
          <label>设备类型</label>
          <select v-model="deviceTypeCode" class="input">
            <option v-for="(option,index) in options" v-bind:value="option.value" :key="index">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="temp-search-row">
          <label>设备名称</label>
          <input class="input" type="text" v-model="deviceName">
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
          </h1>
      </div>
      <div class="temp-table-content">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>设备号</th>
              <th>设备名称</th>
              <th>设备类型</th>      
              <th>状态</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if="onData"><th colspan="6" class="no-data">没有相关数据</th></tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{item.deviceId}}</th>
              <th>{{item.deviceCode}}</th>
              <th>{{item.deviceName}}</th>
              <th>{{item.deviceTypeName}}</th>
              <th :style="{color:item.status == 1 ? '#67C23A':'#F56C6C'}">{{item.status|formatStatus}}</th>
              <th>{{item.remark}}</th>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="5"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
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
import {getDevice} from 'api/getDevice'
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        page:1,
        row: 10,
        total: 0,
        deviceTypeCode:'', // 设备类型编号
        deviceName:'',     // 设备名称
        deviceCode:'',  //  设备号
        auto: '',
        tableData: [],
        isloading:false,
        onData: false,
        options:[
          {text:'输液监控器',value:'01'},
          {text:'体温计',value:'03'},
        ]
      }
    },
    filters:{
      formatStatus(status) {
        if (status == 0) {
          return '失效'
        }else {
          return '正常'
        }
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
        this.deviceTypeCode = ''
        this.deviceName = ''
        this.deviceCode = ''
        this.getDeviceData()
      },
      // 查询表格
      findData () {
        this.page = 1
        this.getDeviceData()
      },
      getDeviceData () {
        this.isloading = true
        let mydata = {
          rows: this.row,
          page: this.page,
          deviceTypeCode: this.deviceTypeCode,
          deviceName: this.deviceName,
          deviceCode: this.deviceCode
          }
        getDevice(mydata).then((data) => {
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
      　　　　const tHeader = ['序号', '设备号', '设备名称', '设备类型', '状态','正常'];
      　　　　const filterVal = ['deviceId', 'deviceCode', 'deviceName','deviceTypeName','status','remark'];
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
      this.getDeviceData()
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getDeviceData()
      }
    }
  }
</script>