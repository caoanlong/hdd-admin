import Vue from 'vue'
import Router from 'vue-router'
import VueObj from '../main.js'

import store from '../store'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

function modifyComponent (routers) {
	if (routers) {
		for (let i = 0; i < routers.length; i++) {
			routers[i].component = require('@/components' + routers[i].component).default
			if (routers[i].children) {
				modifyComponent(routers[i].children)
			}
		}
		return routers
	} else {
		throw new Error('routers is not existence!')
	}
}
store.dispatch('saveAllmenu')

export let asyncRouterMap = () => modifyComponent(store.getters.menus)

export let routerMap = () => [
	{
		path: '',
		component: Layout,
		children: asyncRouterMap()
	},
	{
		path: '*',
		redirect: '/404',
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

let router = new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap()
})

export let reloadRouter = () => {
	console.log(routerMap())
	// console.log(VueObj.$router)
	// router.options.routes = routerMap
}

export default router
