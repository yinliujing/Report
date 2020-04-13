import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios';
import QS from 'qs';
import './iview';
import './vcharts'

Vue.prototype.$axios = axios;
Vue.prototype.$qs = QS;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.prototype.$moment = moment;
// 需要汉化
moment.locale('zh-cn');

Vue.use(Vuex);
// Vue.use(ViewUI);



new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
