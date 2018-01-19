import Vue from 'vue'
import Router from 'vue-router'

import { getRouterDB } from '../routerDB'

import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

function modifyComponent (routers) {
	if (routers) {
		for (let i = 0; i < routers.length; i++) {
			console.log(routers[i].component)
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

export const asyncRouterMap = modifyComponent(getRouterDB())

export let routerMap = [
	{
		path: '',
		component: Layout,
		children: asyncRouterMap
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

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})
