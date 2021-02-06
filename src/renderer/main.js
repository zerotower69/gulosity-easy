import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import './external'
import '@/assets/css/index.css';
import "@/assets/icons/iconfont.js";
import "@/assets/icons/index.css";
import db from './datastore'
import AlibabaIcon from "@/components/alibaba-icon";
Vue.component("alibaba-icon",AlibabaIcon);
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// 数据库挂载到原型链
Vue.prototype.$db=db;
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
