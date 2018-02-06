// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.css'
import './assets/styles/sidebar.css'
import App from './App'
import {routerMap} from './router'
import {_initRouter_} from './router'
import store from './store'
import * as filters from './filters' // global filters

import './assets/icons' // icon
import './errorLog'// error log
import { permissions } from './permission' // permission control

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(Element)

Vue.config.productionTip = false

Vue.prototype.imgUrl = "http://develop.we-service.cn/hdd/image"

/* eslint-disable no-new */

// 重新载入vue
let reloadVueObj = (callback) => {
	_initRouter_().then((router) => {
		new Vue({
			el: '#app',
			router,
			store,
			components: { App },
			template: '<App/>'
		})
		callback && callback()
	})
}

// 初始化Vue
_initRouter_(true).then((router) => {
	permissions(router)
	new Vue({
		el: '#app',
		router,
		store,
		components: { App },
		template: '<App/>'
	})
})

export default reloadVueObj
