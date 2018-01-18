import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../components/Layout'
import Login from '../components/Login'

Vue.use(Router)

export const asyncRouterMap = [
	{
		path: '',
		name: 'home',
		component: () => import('../components/Home/Index'),
		meta: { title: '首页', icon: 'dashboard', roles: ['admin', 'editor']}
	},{
		path: '/carfreecarrier',
		name: 'carfreecarrier',
		component: () => import('../components/CarFreeCarrier/Index'),
		meta: { title: '无车承运人', icon: 'dashboard', roles: ['admin', 'editor']},
		redirect: {name: 'cargoupload'},
		children: [
			{
				path: '/cargoupload',
				name: 'cargoupload',
				component: () => import('../components/CarFreeCarrier/CargoUpload'),
				meta: { title: '货源上传', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/truckupload',
				name: 'truckupload',
				component: () => import('../components/CarFreeCarrier/TruckUpload'),
				meta: { title: '车源上传', icon: 'dashboard', roles: ['admin', 'editor']}
			}
		]
	},{
		path: '/customsevice',
		name: 'customsevice',
		component: () => import('../components/CustomSevice/Index'),
		meta: { title: '客服管理', icon: 'dashboard', roles: ['admin', 'editor']},
		redirect: {name: 'membercertify'},
		children: [
			{
				path: '/membercertify',
				name: 'membercertify',
				component: () => import('../components/CustomSevice/MemberCertify'),
				meta: { title: '会员认证', icon: 'dashboard', roles: ['admin', 'editor']}
			}
		]
	}
]

export let routerMap = [
	{
		path: '/',
		component: Layout,
		children: asyncRouterMap
	},{
		path: '*',
		redirect: '/',
	},{
		path: '/login',
		name: 'login',
		component: Login
	}
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})
