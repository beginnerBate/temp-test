# temp-test

> 'just a simple admin platform'
## 基本架构
1. 引入stylus 
```npm
  npm i stylus stylus-loader --save-dev
```
2. 安装 babel-polyfill 
```javascript
  npm i babel-polyfill --save
  // 在main.js中
  import 'babel-pollyfill'
```
## 项目骨架搭建
 1. 页面需求分析
   ``` 
    1. 登录页面（login.vue）
    2. 主页面 （home.vue）
    2.1. 数据查询页面 （temp.vue）
    2.2. 设备管理页面 (device.vue)
    2.3. 系统设置页面 (set.vue)
    2.4 左侧菜单 right-mean.vue
   ```
  2. 页面颜色分析 蓝色 
  3. 字号 body同一字体大小 12px/2 Helvetica,Arial,sans-serif
  4. 路由配置
## git相关
1. 创建分支 git branch master1 '初始化项目代码'
2. 创建分支 git branch temp-test2 '页面骨架搭建'
3. 创建分支 git branch temp-test3 '页面登录'
4. 创建分支 git brach temp-test4 'Home页面开发'
5. 创建分支 git branch temp-test6 '完善页面和接口对接'
   导航优化 二级菜单可折叠

## 登录页面开发
  1. axios 安装
  2. mock 数据模拟
  3. 自定义验证
  4. 登录成功时候保存 sessionStroage
## Home页面开发
  1. rightMean开发 font-awesome 使用
    
  ```javascript
     npm i font-awesome --save
    //  main.js 中插入
     import 'font-awesome/css/font-awesome.css'
  ```
  2. 体温数据查询页面搭建
  ```javascript
    //  1.表格数据渲染 √
    //  2.表格分页插件 √
    自定义page.vue 组件 √
    //  3.select 组件
        自定义select.vue 组件 √
    //  4.表格数据导出    √
    //  5.vue-happy-scroll 美化
        1. 安装 npm i -D vue-happy-scroll
        2. 全局注册
    //  6.时间选择组件
     npm install vue-flatpickr-component
    //  表格动态数据实时刷新
      定时器 组件销毁的时候 清空定时器
  ```
  3. 修改密码
  ```
    1. 页面样式编写
    2. 数据交互
    3. 修改完成之后 跳转到登录页面
  ```
## 设备管理页面开发
    添加设备 --ok
    删除设备 
    修改设备
    http://localhost:8080/mcim-webservice/devices/{deviceId} 提交方式：PUT 参数：deviceTypeCode  deviceName  deviceCode
    查询设备
    设备数据渲染
## 设备位置管理页面开发
    添加设备位置
    获取设备号 --- 异步操作问题
    删除设备   --- 删除样式修改 默认蓝色
    修改设备   ---弹出框参数修改
    查询设备   --- 添加token
    设备数据渲染 ---去除病区字段
## 体温数据查询管理页面开发
    设备数据渲染 ---去除病区字段
## 输液监控数据查询管理页面开发
    表格渲染
    查询字段设置
## 登录页面开发
   数据对接
   http://192.168.0.100/mcim-webservice/login 
   提交方式：post  
   参数：username password exp (0:20分钟 1:7天) 默认为1   
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 相关问题
  1. vue click 事件 会点击子元素 利用index
  2. 只要异步动态获取数据 要用loading加载
  3. ie9 在vue下的兼容问题
## 细节完善
  1. 添加token
  2. 页面刷新的时候分页没有改变 当前页面刷新 和 只有第一页刷新 两种
  3. 修改设备位置的时候可以为空
  4. 优化登录失败的时候提醒登录超时
  修改login.js 的promose
## 测试
// "port": "http://192.168.0.200:8888/webservice/"
// "port": "http://192.168.0.100/mcim-webservice"
## ie兼容问题
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
1. input 问题---关闭浏览器输入框自动补齐 兼容IE,FF,Chrome等主流浏览器
<!-- autocomplete="off" -->
<input type="text" disableautocomplete id="number"/>
<input type="text" autocomplete="off" id="number"/>
2. Error in beforeDestroy hook: "TypeError: 对象不支持“destroy”属性或方法" ie9
3. SCRIPT5022: SecurityError ie11 ie10 ie9 
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
