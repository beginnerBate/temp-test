<template>
  <div class="temp">
    <div class="temp-search">
      <h1>查询条件</h1>
      <div class="temp-search-wrapper">
        <div class="temp-search-row"><label>病房号</label><input class="input" type="text" v-model="wardNumber"></div>
        <div class="temp-search-row"><label>床号</label><input class="input" type="text" v-model="bedNumber"></div>
        <div class="temp-search-row"><label>剩余容量</label><input class="input" type="text" v-model="surplus"></div>
        <div class="temp-search-row relative">
          <label>开始时间</label>
          <flat-pickr v-model="startTime" :config="config" class="input"></flat-pickr>
          <a class="input-button" title="clear" @click="clearStarttime()">
           <i class="fa fa-times"></i>
          </a>
        </div>
        <div class="temp-search-row relative">
          <label>结束时间</label>
          <flat-pickr v-model="endTime" :config="config" class="input"></flat-pickr>
          <a class="input-button" title="clear" @click="clearEndtime()" >
           <i class="fa fa-times"></i>
          </a>
        </div>
        <div class="temp-search-row" style="margin-top: 26px;"><span class="btn btn-search" @click="findData"><i class="fa fa-search"></i>查询</span></div>
      </div>
    </div>
    <div class="temp-table">
      <div class="temp-table-header"> 
        <h1><span  @click="export2Excel()"><i class="fa fa-download"></i> 导出数据</span></h1>
      </div>
      <div class="temp-table-content">
        <table class="table">
          <thead>
            <tr>
              <!-- <th>序号</th> -->
              <th>序号</th>
              <th>病房号</th>
              <th>床号</th>      
              <th>设备名称</th>
              <th>液瓶容量(mL)</th>
              <th>剩余容量(mL)</th>
              <th>滴数</th>
              <th>输液计时(mL)</th>
              <th>液滴速度(滴/分)</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>运行状态</th>
              <th>处理状态</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-if="onData"><th colspan="11" class="no-data">没有相关数据</th></tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <th>{{(index+1)+((page-1) *row)}}</th>
              <th>{{item.wardNumber}}</th>
              <th>{{item.bedNumber}}</th>
              <th>{{item.deviceName}}</th>
              <th>{{item.volum}}</th>
              <th>{{item.surplus}}</th>
              <th>{{item.dotCnt}}</th>
              <th>{{item.timer}}</th>
              <th>{{item.dotRate}}</th>
              <th>{{item.startTime | formatDate}}</th>
              <th>{{item.endTime | formatDate}}</th>
              <th :style="{color:item.status == 1 ? '#F56C6C':'#67C23A'}">{{item.status|formatStatus}}</th>
              <th :style="{color:item.runStatus == 0 ? '#F56C6C':'#67C23A'}">{{item.runStatus|formatRunstatus}}</th>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="11"><page :total="total" :current-page="page" @pagechange='pagechange'></page></td>
              <td colspan="2" class="item-switch-re">
                <div class="item">
                  <span class="item-label" :style="{color: auto == true ? '#398dee': '#333333'}">自动刷新</span>
                    <div class="switch">
                        <input id="switch" type="checkbox" hidden="hidden" v-model="auto"/>
                        <label for="switch"></label>
                    </div>
                </div>
                </td>
            </tr>
          </tfoot>
        </table>
        <!-- loading -->
        <div v-show="isloading && !auto && !total" class="loading-container">
          <loading title=""></loading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTrans} from 'api/getTrans'
import Page from 'base/page/page'
import {formatDate} from 'api/data'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import Loading from 'base/loading/loading'
  export default {
    data () {
      return {
        page:1,
        row: 10,
        total: 0,
        bedNumber:'',
        wardNumber:'',
        surplus:'',
        startTime:'',
        endTime:'',
        auto: '',
        config:{
          enableTime: true,
          enableSeconds:true,
          time_24hr:true,
          dateFormat: "Y-m-d H:i:s",
          
        },
        tableData: [],
        TimerAjax:"",
        isloading:false,
        onData: false
      }
    },
    filters:{
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(status) {
        if (status == 0) {
          return '运行'
        }else {
          return '阻断'
        }
      },
      formatRunstatus(status) {
        if (status == 0) {
          return '未处理'
        }else {
          return '已处理'
        }
      }
    },
    components: {
      Page,
      flatPickr,
      Loading
    },
    methods: {
      pagechange (value) {
        this.page = value
        this.getTransData()
      },
      findData(){
        this.page = 1
      this.getTransData()
      },
      getTransData () {
        this.isloading = true
        let mydata = {
          rows:this.row,
          page:this.page,
          bedNumber: this.bedNumber,
          wardNumber: this.wardNumber,
          surplus: this.surplus,
          startTime: this.startTime,
          endTime: this.endTime
          }
        getTrans(mydata).then((data) => {
         this.isloading = false
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
      clearStarttime () {
        this.startTime = ''
      },
      clearEndtime () {
        this.endTime = ''
      },
      export2Excel() {
      　　require.ensure([], () => {
      　　　　const { export_json_to_excel } = require('vendor/Export2Excel');
      　　　　const tHeader = [ '病区', '病房号', '床号', '设备名称','液瓶剩余容量(mL)','液瓶容量(mL)','滴数','输液计时(mL)',	'液滴速度(滴/分)',	'监测时间'];
      　　　　const filterVal = [ 'inpatientAreaName', 'wardNumber','bedNumber','deviceName','surplus','volum','dotCnt','timer','dotRate', 'startTime'];
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
      this.getTransData()
    },
    watch: {
      pagechange (value) {
        this.page = value
        this.getTransData()
      },
      auto (value) {
        if (value == true){
          // 自动刷新
          this.row = 10
          this.page =1
          this.bedNumber= ''
          this.wardNumber = ''
          this.surplus = ''
          this.endTime = ''
          this.startTime = ''
          let that = this
          this.TimerAjax = setInterval(function(){
            that.getTransData()
          },1000)
        }
        else if(value == false){
          // 清除定时器
          clearInterval(this.TimerAjax)
        }
      }
    },
    destroyed () {
      // 清除定时器
    // clearInterval(this.TimerAjax)
    }
  }
</script>

<style scoped>

</style>