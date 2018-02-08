import Vue from 'vue'
import Router from 'vue-router'

import {getMenus} from '../api/menu'

import store from '../store'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

function modifyComponent (routers) {
	if (routers) {
		for (let i = 0; i < routers.length; i++) {
			routers[i].meta = {title: routers[i].title}
			if (typeof routers[i].component == 'string') {
				routers[i].component = require('@/components' + routers[i].component).default
			}
			if (routers[i].children) {
				modifyComponent(routers[i].children)
			}
		}
		return routers
	} else {
		throw new Error('routers is not existence!')
	}
}

let routerMap = [
	{
		path: '',
		component: Layout,
		children: []
	},
	{
		path: '*',
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/404',
		name: '404',
		component: Temp404
	}
]

export let _initRouter_ = (first) => {
	return new Promise((resolve, reject) => {
		let router
		if (first) {
			if (store.getters.menus) {
				routerMap[0].children = modifyComponent(store.getters.menus)
			}
			router = new Router({
				scrollBehavior: () => ({ y: 0 }),
				routes: routerMap
			})
			resolve(router)
		} else {
			getMenus().then(res => {
				store.dispatch('saveAllmenu', res)
				sessionStorage.setItem('menus', JSON.stringify(res))
				routerMap[0].children = modifyComponent(res)
				router = new Router({
					scrollBehavior: () => ({ y: 0 }),
					routes: routerMap
				})
				resolve(router)
			})
		}
	})
}

