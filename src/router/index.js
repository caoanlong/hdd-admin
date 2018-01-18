import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

const routesData = [
	{
		path: '/',
		name: 'home',
		component: '@/components/Home',
		meta: {
			title: '首页',
			icon: 'dashboard',
			roles: 'admin,editor'
		},
		redirect: null,
		children: null
	},{
		path: '/carfreecarrier',
		name: 'carfreecarrier',
		component: '@/components/CarFreeCarrier',
		meta: {
			title: '无车承运人',
			icon: 'dashboard',
			roles: 'admin,editor'
		},
		redirect: '/cargoupload',
		children: [
			{
				path: '/cargoupload',
				name: 'cargoupload',
				component: '@/components/CarFreeCarrier/CargoUpload',
				meta: {
					title: '货源上传',
					icon: 'dashboard',
					roles: 'admin,editor'
				},
				redirect: null,
				children: null
			},{
				path: '/truckupload',
				name: 'truckupload',
				component: '@/components/CarFreeCarrier/TruckUpload',
				meta: {
					title: '车源上传',
					icon: 'dashboard',
					roles: 'admin,editor'
				},
				redirect: null,
				children: null
			}
		]
	}
]

export const asyncRouterMap = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/components/Home'),
		meta: { title: '首页', icon: 'dashboard', roles: ['admin', 'editor']}
	},{
		path: '/carfreecarrier',
		name: 'carfreecarrier',
		component: () => import('@/components/CarFreeCarrier'),
		meta: { title: '无车承运人', icon: 'dashboard', roles: ['admin', 'editor']},
		redirect: '/cargoupload',
		children: [
			{
				path: '/cargoupload',
				name: 'cargoupload',
				component: () => import('@/components/CarFreeCarrier/CargoUpload'),
				meta: { title: '货源上传', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/truckupload',
				name: 'truckupload',
				component: () => import('@/components/CarFreeCarrier/TruckUpload'),
				meta: { title: '车源上传', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/waybill',
				name: 'waybill',
				component: () => import('../components/CarFreeCarrier/Waybill'),
				meta: { title: '运单上传', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/interfaceConfig',
				name: 'interfaceConfig',
				component: () => import('../components/CarFreeCarrier/InterfaceConfig'),
				meta: { title: '接口配置', icon: 'dashboard', roles: ['admin', 'editor']}
			}
		]
	},{
		path: '/customsevice',
		name: 'customsevice',
		component: () => import('@/components/CustomSevice'),
		meta: { title: '客服管理', icon: 'dashboard', roles: ['admin', 'editor']},
		redirect: {name: 'membercertify'},
		children: [
			{
				path: '/membercertify',
				name: 'membercertify',
				component: () => import('@/components/CustomSevice/MemberCertify'),
				meta: { title: '会员认证', icon: 'dashboard', roles: ['admin', 'editor']}
			}
		]
	},{
		path: '/businessconfig',
		name: 'businessconfig',
		component: () => import('@/components/BusinessConfig'),
		meta: { title: '业务配置', icon: 'dashboard', roles: ['admin', 'editor']},
		redirect: {name: 'contentmanage'},
		children: [
			{
				path: '/contentmanage',
				name: 'contentmanage',
				component: () => import('@/components/BusinessConfig/ContentManage'),
				meta: { title: '内容管理', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/messagemanage',
				name: 'messagemanage',
				component: () => import('@/components/BusinessConfig/MessageManage'),
				meta: { title: '消息管理', icon: 'dashboard', roles: ['admin', 'editor']}
			},{
				path: '/crontab',
				name: 'crontab',
				component: () => import('../components/BusinessConfig/Crontab'),
				meta: { title: '定时任务', icon: 'dashboard', roles: ['admin', 'editor']}
			}
		]
	},{
		path: '/system',
		name: 'system',
		component: () => import('@/components/System'),
		meta: { title: '系统管理', icon: 'dashboard', roles: ['admin']},
		redirect: {name: 'systemsetting'},
		children: [
			{
				path: '/systemsetting',
				name: 'systemsetting',
				component: () => import('@/components/System/SystemSetting'),
				meta: { title: '系统设置', icon: 'dashboard', roles: ['admin']}
			}
		]
	}
]

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
