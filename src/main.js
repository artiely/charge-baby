import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './assets/style/main.less'
import './assets/iconfont/iconfont.css'
import Api from './api'
import * as filters from './filter'
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Api)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
