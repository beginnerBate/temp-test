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
          <span class="btn-add" @click="messageShow=true"><i class="fa fa-plus"></i> 新增设备</span>
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
        <!-- message-box-新增位置管理 -->
        <message-box title="新增设备" @hide="messageShow=false" v-if="messageShow"> 
          <form class="add-form">
            <div class="add-form-item-label">
              <label for="deviceType">选择设备类型</label>
              <span>输液监控器</span>
              <t-radio value="01" v-model="add.deviceTypeCode"></t-radio>
              <span>体温计</span> 
              <t-radio value="03" v-model="add.deviceTypeCode"></t-radio> 
            </div>
            <div class="add-form-item-input">
              <label for="wardNumber">填写设备名称</label>
              <input type="text" v-model="add.deviceName" class="input" required>
            </div>
            <div class="add-form-item-input">
              <label for="bedNumber">填写设备编号</label>
              <input type="text" v-model="add.deviceCode" class="input" required>
            </div>
            <div>
              <button class="btn btn-submit" @click="addDevice()">提交</button>
            </div>
          </form>
        </message-box>
        <!-- notice -->
        <v-notice v-if="notice.type" :type="notice.type" :info="notice.info"></v-notice>        
      </div>
    </div>
  </div>
</template>

<script>
import {getDevice} from 'api/getDevice'
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
import MessageBox from 'base/message-box/message-box'
import TRadio from 'base/t-radio/t-radio'
import VSelect from 'base/v-select/v-select'
import VNotice from 'base/v-notice/v-notice'
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
        ],
        add: {
          deviceTypeCode: '01',  // 设备类型
          deviceName: '',  // 设备名称
          deviceCode:''     // 设备编号
        },
        deviceCodeList:[],
        messageShow: false,
        notice:{
          type:'',
          info:'',
        }
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
      Loading,
      MessageBox,
      TRadio,
      VSelect,
      VNotice
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
      // 提交新设备
      addDevice () {
        let mydata = {
          deviceTypeCode: this.add.deviceTypeCode,
          deviceName: this.add.deviceName,
          deviceCode: this.add.deviceCode
        }
        console.log(mydata)
        // 参数验证
        if (this.add.deviceName.length == 0){return}
        if (this.add.deviceCode.length == 0){return}

        
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        // addDevice(mydata).then((res)=>{
        //   if (res.code == '200') {
        //     console.log('添加成功')
        //   }else {
        //     // 添加失败
        //   }
        // })
        // 模拟
        let that = this
        setTimeout(function(){
        that.notice.type = 'success'
        that.notice.info = '提交成功'
        setTimeout(()=>{
        that.notice.type = ''
        that.notice.info = ''
        },1000)
        },3000)
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