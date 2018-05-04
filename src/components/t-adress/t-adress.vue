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
          <span class="btn-add" @click="showadd()"><i class="fa fa-plus"></i> 新增设备位置</span>
          </h1>
      </div>
      <div class="temp-table-content">
        <table class="table">
          <thead>
            <tr>
              <th>序号</th>
              <th>病房号</th>
              <th>床号</th>
              <th>设备类型</th>
              <th>设备号</th>            
              <th>设备名称</th>
              <th width='200px'>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if="onData"><th colspan="6" class="no-data">没有相关数据</th></tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{(index+1)+((page-1) *row)}}</th>
              <th>{{item.wardNumber}}</th>
              <th>{{item.bedNumber}}</th>
              <th>{{item.deviceTypeName}}</th>
              <th>{{item.deviceCode}}</th>
              <th>{{item.deviceName}}</th>
              <th>
                <span class="fa fa-pencil-square-o edit" @click="modifyDevice(item)">修改</span>
                <span class="fa fa-times danger" @click="removeDevice(item)">删除</span>
              </th>
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
        <div v-show="isloading" class="loading-container">
          <loading title=""></loading>
        </div>
        <!-- message-box-新增位置管理 -->
        <message-box :title="mBox.title" @hide="messageShow=false" v-if="messageShow"> 
          <form class="add-form" autocomplete="off">
            <div class="add-form-item-select" v-if="mBox.title=='新增设备位置' || mBox.title=='修改设备位置'">
              <label for="deviceType">设备类型</label>
              <v-select :list="options" v-model="deviceType" :valueItem='valueItem'></v-select> 
            </div>
            <div class="add-form-item-select" v-if="mBox.title=='新增设备位置' || mBox.title=='修改设备位置'">
              <label for="deviceCode">设备名称</label>
              <v-select :list="deviceCodeList" v-model="add.deviceCode" :valueItem='valueItem1'></v-select>
              <!-- <span>{{add.deviceCode}}</span> -->
            </div>
            <div class="add-form-item-input" v-if="mBox.title=='新增设备位置' || mBox.title=='修改设备位置'">
              <label for="wardNumber">填写房号</label>
              <input type="text" v-model="add.wardNumber" class="input" required>
            </div>
            <div class="add-form-item-input" v-if="mBox.title=='新增设备位置' || mBox.title=='修改设备位置'">
              <label for="bedNumber">填写床号</label>
              <input type="text" v-model="add.bedNumber" class="input" required>
            </div>
            <div class="add-form-del" v-if="mBox.title=='提示'">
              确定删除吗？
            </div>
            <div>
              <button v-if="mBox.title=='新增设备位置'" class="btn btn-submit" @click.prevent="addDevicePos()">提交</button>
              <button v-if="mBox.title=='修改设备位置'" class="btn btn-submit" @click.prevent="editDevice()">修改</button>
              <button v-if="mBox.title=='提示'" class="btn btn-submit btn-del" @click.prevent="delDevice()">确定</button>
              <button v-if="mBox.title=='提示'" class="btn btn-submit btn-del cancle" @click.prevent="undelDevice()">取消</button>
            </div>
          </form>
        </message-box>
        <!-- notice -->
        <v-notice v-if="notice.type" :type="notice.type" :info="notice.info"></v-notice>
        <!-- MessageAlert -->
        <v-dialog v-show="showDialog" :dialog-option="dialogOption" ref="dialog"></v-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {getLocation, addDevicePos, editDevicePos, removeDevicePos,devicePositions} from 'api/get-adress'
import {getDevice} from 'api/getDevice'
import Page from 'base/page/page'
import Loading from 'base/loading/loading'
import MessageBox from 'base/message-box/message-box'
import VDialog from 'base/v-dialog/v-dialog'
import TRadio from 'base/t-radio/t-radio'
import VSelect from 'base/v-select/v-select'
import VNotice from 'base/v-notice/v-notice'
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
        ],
        deviceType: '' , // 设备类型
        add: {
          deviceCode: '',  // 设备号
          wardNumber: '',  // 病房号
          bedNumber:'',     // 病床号
          devicePositionId:'',
          deviceId:''
        },
        deviceCodeList:[],
        messageShow: false,
        notice:{
          type:'',
          info:'',
        },
        dialogOption:{
          title: "确定删除吗?"
        },
        showDialog:true,
        valueItem:'',
        valueItem1:'',
        mBox:{
          title:'',
        },
      }
    },
    components: {
      Page,
      Loading,
      MessageBox,
      VDialog,
      TRadio,
      VSelect,
      VNotice
    },
    methods: {
      pagechange (value) {
        this.page = value
        this.getLocationData()
      },
      // 刷新表格
      refreshTable(){
        // this.page = 1
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
      // 获取设备号
      getDeviceCode () {
        getDevice({deviceTypeCode: this.deviceType}).then((res)=>{
           if (res.code == '200') {
             this.deviceCodeList.length=0
             res.data.forEach((item,index)=>{
               this.deviceCodeList[index] = new Object()
               this.deviceCodeList[index].text =  item.deviceName
               this.deviceCodeList[index].value =  item.deviceId
             })
           } else {
             this.deviceCodeList.length=0
           }
        })
      },
      // 提交设备位置
      addDevicePos () {
        let mydata = {
          wardNumber: this.add.wardNumber,
          bedNumber: this.add.bedNumber,
          deviceId: this.add.deviceCode
        }
        // 参数验证
        if (this.add.wardNumber.length == 0){return}
        if (this.add.bedNumber.length == 0){return}
        if (this.add.deviceCode.length == 0){return}
        let that = this   
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        addDevicePos(mydata).then((res)=>{
          if (res.code == '200') {
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
        }).catch((err)=>{
             that.notice.type = 'error'
            that.notice.info = '添加失败'
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)         
        })
      },
     showadd(){
        this.messageShow=true
        this.mBox.title=`新增设备位置`
        this.clearData()
      },
      editDevice(){
        let mydata = {
          wardNumber: this.add.wardNumber,
          bedNumber: this.add.bedNumber,
          deviceId: this.add.deviceCode? this.add.deviceCode : 0
        }
        // console.log(mydata)
        // alert(mydata.deviceId)
        // 参数验证
        if (this.add.wardNumber.length == 0){return}
        if (this.add.bedNumber.length == 0){return}

        let that = this
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '提交中'
        editDevicePos(this.add.devicePositionId,mydata).then((res)=>{
          if (res.code == '200') {
            // console.log('添加成功')
            that.notice.type = 'success'
            that.notice.info = '修改成功'
            that.refreshTable()
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
              that.messageShow = false
              // that.clearData()
            },1000)
          }else {
            that.notice.type = 'error'
            that.notice.info = '修改失败'
            // that.clearData()
            setTimeout(()=>{
              that.notice.type = ''
              that.notice.info = ''
            },1000)
          }
        })        
      },
      clearData () {
        this.add.deviceCode = ''
        this.add.wardNumber = ''
        this.add.bedNumber = ''
        this.add.deviceId = ''
        this.valueItem = ''
        this.valueItem1 = ''
        this.add.devicePositionId =''
      },
      // 修改设备
      modifyDevice (item) {
        this.mBox.title=`修改设备位置`
         
        // 填充参数
        // 根据设备号获取设备类型
        let deviceTypeName = ''
        let deviceTypeCode = ''
        let deviceName = ''
        let deviceId = ''
        devicePositions(item.devicePositionId).then((res)=>{
         if(res.code==200){
           if (res.data.deviceTypeId==null) {
            deviceTypeCode = ''
            deviceTypeName = ''
            deviceName = ''
            deviceId = 0
            this.add.deviceCode = 0
            
           }else {
            deviceTypeCode = res.data.deviceTypeName =='输液监控器' ? '01': "03"
            deviceTypeName = res.data.deviceTypeName
            deviceName = res.data.deviceName
            deviceId = res.data.deviceId
            this.add.deviceCode = res.data.deviceId
            console.log(res.data.deviceId)
           }
            this.getDeviceCode()
            return Promise.resolve({deviceTypeName,deviceTypeCode,deviceName,deviceId})
         }
        })
        .then((data)=>{
          //  console.log(data)
            this.add.deviceTypeCode = data.deviceTypeCode
            this.add.wardNumber = item.wardNumber
            this.add.bedNumber = item.bedNumber
            this.add.deviceId = data.deviceId
            this.add.devicePositionId = item.devicePositionId
            this.valueItem = `${data.deviceTypeName}`
            this.valueItem1 = data.deviceName
            console.log(data.deviceName)
            this.messageShow=true
        })
      },
      // 删除设备
      removeDevice(item) {
        this.messageShow=true
        this.mBox.title=`提示`
        this.add.devicePositionId = item.devicePositionId 
      },
      // 提交删除
      delDevice() {
        let that = this
        // 提交
        this.notice.type = 'loading'
        this.notice.info = '删除中'
        removeDevicePos(this.add.devicePositionId).then((res)=>{
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
      this.getLocationData()
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getLocationData()
      },
      deviceType (value) {
        // 根据设备类型请求设备号
        this.getDeviceCode()
        // 数据模拟
      }
    },
    mounted () {
      this.showDialog = false;
      this.$refs.dialog.confirm().then(() => {
       this.showDialog = false;
      //  next();
      }).catch(() => {
       this.showDialog = false;
      //  next();
      })
    }
  }
</script>