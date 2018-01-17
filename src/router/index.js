import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routerMap = [
	{
		path: '*',
		redirect: '/',
	},{
		path: '/login',
		name: 'login',
		component: () => import('@/components/Login')
	},{
		path: '/',
		name: 'layout',
		component: () => import('@/components/Layout'),
		// redirect: {name: 'home'},
		// children: [
		// 	{
		// 		path: '/home',
		// 		name: 'home',
		// 		components: () => import('@/components/Home')
		// 	}
		// ]
	}
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})
