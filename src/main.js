import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// 注册全局过滤器
import { fmDate } from './utils/dayjs'
import VeeValidate, { Validator } from 'vee-validate'
// 导入检测是否登录的插件
import Checklogin from './utils/CheckLogin'
// 导入VeeValidate的中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import './styles/index.css'
// 注册时间全局过滤器
Vue.filter('fmDate', fmDate)

// 注册是否登录的插件
Vue.use(Checklogin)

Vue.use(Vant)
Vue.use(VeeValidate, {
  // 文本框中触发验证的事件 默认是input
  events: ''
})
// 配置中文
Validator.localize('zhCN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
