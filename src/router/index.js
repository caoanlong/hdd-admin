import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routerMap = [
	{
		path: '*',
		redirect: '/',
	},{
		path: '/login',
		name: 'login',
		component: () => import('@/components/Login')
	}
]
export const asyncRouterMap = [
	{
		path: '/',
		name: 'layout',
		component: () => import('@/components/Layout'),
		redirect: {name: 'home'},
		children: [
			{
				path: '/home',
				name: 'home',
				components: () => import('@/components/Home'),
				 meta: { title: '首页', icon: 'dashboard', noCache: true }
			}
		]
	}
]

routerMap = routerMap.concat(asyncRouterMap)

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})
