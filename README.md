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
  ```
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
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
