// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Echo from 'laravel-echo'
import VueApexCharts from 'vue-apexcharts'
import moment from 'moment'
import VueTimeago from 'vue-timeago'

window.Pusher = require('pusher-js')

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'es', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja'),
  },
})

Vue.prototype.moment = moment
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
// const moment = require('moment')
// require('moment/locale/es')
// Vue.use(require('vue-moment'), {
//   moment,
// })

Vue.use(VueQuillEditor)
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '3a7bcec114b26feb536a',
    cluster: 'us2',
    forceTLS: true,
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
