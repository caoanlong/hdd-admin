// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill" // 兼容IE
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import './assets/styles/sidebar.css'

import ZkTable from 'vue-table-with-tree-grid'

import App from './App'
import router from './router'
import store from './store'
// global filters
import * as filters from './filters'
import globals from './common/global'
// icon
import './assets/icons'
 // permission control 判断是否登录
// import { permissions } from './permission'

import '../static/plugins/jquery.gridly.js'

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(Element)
Vue.use(ZkTable)
Vue.use(globals)

Vue.config.productionTip = false

/* eslint-disable no-new */
export const vueInstance = new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
