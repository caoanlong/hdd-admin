// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import './assets/styles/sidebar.css'
import App from './App'
import router from './router'
import store from './store'
// global filters
import * as filters from './filters'
// icon
import './assets/icons'
 // permission control 判断是否登录
import { permissions } from './permission'

import '../static/plugins/UE/ueditor.config'
import '../static/plugins/UE/ueditor.all.min'
import '../static/plugins/UE/lang/zh-cn/zh-cn'
import '../static/plugins/UE/ueditor.parse.min'

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.imgUrl = "http://develop.we-service.cn/hdd/image"

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
