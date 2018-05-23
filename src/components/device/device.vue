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
        <div class="temp-search-row" style="margin-top: 26px;"><span class="btn btn-search" @click="findData()"><i class="fa fa-search"></i>查询</span></div>
      </div>
    </div>
    <div class="temp-table">
      <div class="temp-table-header"> 
        <h1>
          <span  @click="export2Excel()"><i class="fa fa-download"></i> 导出数据</span>
          <span class="btn-add" @click="showadd()"><i class="fa fa-plus"></i> 新增设备</span>
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
              <th width='200px'>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if="onData"><th colspan="6" class="no-data">没有相关数据</th></tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{(index+1)+((page-1) *row)}}</th>
              <th>{{item.deviceCode}}</th>
              <th>{{item.deviceName}}</th>
              <th>{{item.deviceTypeName}}</th>
              <th :style="{color:item.status == 1 ? '#67C23A':'#F56C6C'}">{{item.status|formatStatus}}</th>
              <th>
                <span class="fa fa-pencil-square-o edit" @click="modifyDevice(item)">修改</span>
                <span class="fa fa-times danger" @click="removeDevice(item)">删除</span>
              </th>
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
        <div v-show="isloading" class="loading-container">
          <loading title=""></loading>
        </div>
        <!-- message-box-新增位置管理 -->
        <message-box :title="mBox.title" @hide="messageShow=false" v-if="messageShow"> 
          <form class="add-form" autocomplete="off">
            <div class="add-form-item-select" v-if="mBox.title=='新增设备' || mBox.title=='修改设备'">
              <label for="deviceType">选择设备类型</label>
               <v-select :list="deviceCodeList" v-model="add.deviceTypeCode" :valueItem='valueItem'></v-select> 
            </div>
            <div class="add-form-item-input"  v-if="mBox.title=='新增设备' || mBox.title=='修改设备'">
              <label for="wardNumber">填写设备名称</label>
              <input type="text" v-model="add.deviceName" class="input" required>
            </div>
            <div class="add-form-item-input"  v-if="mBox.title=='新增设备' || mBox.title=='修改设备'">
              <label for="bedNumber">填写设备编号</label>
              <input type="text" v-model="add.deviceCode" class="input" required>
            </div>
            <div class="add-form-del" v-if="mBox.title=='提示'">
              确定删除吗？
            </div>
            <div>
              <button v-if="mBox.title=='新增设备'" class="btn btn-submit" @click.prevent="addDevice()">提交</button>
              <button v-if="mBox.title=='修改设备'" class="btn btn-submit" @click.prevent="editDevice()">修改</button>
              <button v-if="mBox.title=='提示'" class="btn btn-submit btn-del" @click.prevent="delDevice()">确定</button>
              <button v-if="mBox.title=='提示'" class="btn btn-submit btn-del cancle" @click.prevent="undelDevice()">取消</button>
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
import {getDevice, addDevice, editDevice, removeDevice} from 'api/getDevice'
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
          {text:'输液报警器',value:'02'},
          {text:'体温计',value:'03'},
        ],
        add: {
          deviceTypeCode: '',  // 设备类型
          deviceName: '',  // 设备名称
          deviceCode:'' ,    // 设备编号,
          deviceId:''
        },
        deviceCodeList:[
          {text:'输液监控器',value:'01'},
          {text:'输液报警器',value:'02'},
          {text:'体温计',value:'03'}
          ],
        messageShow: false,
        // 弹出框config
        valueItem:'',
        mBox:{
          title:'',
        },
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
        // this.page = 1
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
        //  console.log(data)
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
          // console.log(err)
          this.isloading = false
        })
      },
      showadd(){
        this.messageShow=true
        this.mBox.title=`新增设备`
        this.clearData()
      },
      // 提交新设备
      addDevice () {
        let mydata = {
          deviceTypeCode: this.add.deviceTypeCode,
          deviceName: this.add.deviceName,
          deviceCode: this.add.deviceCode
        }
        // console.log(mydata)
        // 参数验证
        if (this.add.deviceName.length == 0){return}
        if (this.add.deviceCode.length == 0){return}

        let that = this
        
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        addDevice(mydata).then((res)=>{
          if (res.code == '200') {
            // console.log('添加成功')
            that.notice.type = 'success'
            that.notice.info = '提交成功'
            that.refreshTable()
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.messageShow = false             
            },1000)
          }else {
            that.notice.type = 'error'
            that.notice.info = '添加失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)
          }
        })
      },
      editDevice(){
        let mydata = {
          deviceTypeCode: this.add.deviceTypeCode,
          deviceName: this.add.deviceName,
          deviceCode: this.add.deviceCode
        }
        // console.log(mydata)
        // 参数验证
        if (this.add.deviceName.length == 0){return}
        if (this.add.deviceCode.length == 0){return}

        let that = this
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        editDevice(this.add.deviceId,mydata).then((res)=>{
          if (res.code == '200') {
            // console.log('添加成功')
            that.notice.type = 'success'
            that.notice.info = '修改成功'
            that.refreshTable()
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.messageShow = false
              that.clearData()
            },1000)
          }else {
            that.notice.type = 'error'
            that.notice.info = '修改失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.clearData()
            },1000)
          }
        })        
      },
      clearData () {
        this.add.deviceTypeCode = ''
        this.add.deviceName = ''
        this.add.deviceCode = ''
        this.add.deviceId = ''
        this.valueItem =''
      },
      // 修改设备
      modifyDevice (item) {
        // console.log(item)
        this.messageShow=true
        this.mBox.title=`修改设备`
        // 填充参数
        // console.log(item.deviceTypeName)
        if(item.deviceTypeName =='输液监控器'){
          this.add.deviceTypeCode = '01'
        }else if (item.deviceTypeName =='输液报警器') {
          this.add.deviceTypeCode = '02'
        }else if (item.deviceTypeName =='体温计'){
          this.add.deviceTypeCode = '03'
        }
        
        this.add.deviceName = item.deviceName
        this.add.deviceCode = item.deviceCode
        this.add.deviceId = item.deviceId
        this.valueItem = `${item.deviceTypeName} `
      },
      // 提示
      removeDevice(item) {
        this.messageShow=true
        this.mBox.title=`提示`
        this.add.deviceId = item.deviceId 
      },
      // 提交删除
      delDevice() {
        let that = this
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '删除中'
        removeDevice(this.add.deviceId).then((res)=>{
          if (res.code == '200') {
            // console.log('添加成功')
            that.notice.type = 'success'
            that.notice.info = '删除成功'
            that.refreshTable()
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.messageShow = false
              that.clearData()
            },1000)
          }else {
            that.notice.type = 'error'
            that.notice.info = '删除失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)
          }
        }) 
      },
      undelDevice(){
        this.messageShow = false
        this.clearData
      },
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = ['序号', '设备号', '设备名称', '设备类型', '状态'];
      　　　　const filterVal = ['deviceId', 'deviceCode', 'deviceName','deviceTypeName','status'];
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
      // console.log(this.tableData)
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getDeviceData()
      }
    }
  }
</script>