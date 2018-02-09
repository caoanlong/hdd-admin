import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

let routerMap = [
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
	},
	{
		path: '',
		component: Layout,
		children: [
			{
				path: '/',
				name: 'home',
				meta: {
					title: '首页'
				},
				component: () => import('../components/Home')
			},
			{
				path: '/carfreecarrier',
				name: 'carfreecarrier',
				meta: {
					title: '无车承运人'
				},
				component: () => import('../components/CarFreeCarrier')
			},
			{
				path: '/system',
				name: 'system',
				meta: {
					title: '系统管理'
				},
				component: () => import('../components/System'),
				redirect: '/systemsetting',
				children: [
					{
						path: '/systemsetting',
						name: 'systemsetting',
						meta: {
							title: '系统设置'
						},
						component: () => import('../components/System/SystemSetting'),
						redirect: '/menumanage',
						children: [
							{
								path: '/menumanage',
								name: 'menumanage',
								meta: {
									title: '菜单管理'
								},
								component: () => import('../components/System/SystemSetting/MenuManage')
							},
							{
								path: '/usermanage',
								name: 'usermanage',
								meta: {
									title: '用户管理'
								},
								component: () => import('../components/System/SystemSetting/UserManage')
							},
							{
								path: '/adduser',
								name: 'adduser',
								meta: {
									title: '添加用户'
								},
								component: () => import('../components/System/SystemSetting/UserManage/AddUser')
							},
							{
								path: '/edituser',
								name: 'edituser',
								meta: {
									title: '编辑用户'
								},
								component: () => import('../components/System/SystemSetting/UserManage/EditUser')
							},
							{
								path: '/viewuser',
								name: 'viewuser',
								meta: {
									title: '查看用户'
								},
								component: () => import('../components/System/SystemSetting/UserManage/ViewUser')
							},
							{
								path: '/rolemanage',
								name: 'rolemanage',
								meta: {
									title: '角色管理'
								},
								component: () => import('../components/System/SystemSetting/RoleManage')
							},
							{
								path: '/addrole',
								name: 'addrole',
								meta: {
									title: '添加角色'
								},
								component: () => import('../components/System/SystemSetting/RoleManage/AddRole')
							},
							{
								path: '/editrole',
								name: 'editrole',
								meta: {
									title: '编辑角色'
								},
								component: () => import('../components/System/SystemSetting/RoleManage/EditRole')
							},
							{
								path: '/viewrole',
								name: 'viewrole',
								meta: {
									title: '查看角色'
								},
								component: () => import('../components/System/SystemSetting/RoleManage/ViewRole')
							},
							{
								path: '/orgmange',
								name: 'orgmange',
								meta: {
									title: '机构管理'
								},
								component: () => import('../components/System/SystemSetting/OrgManage')
							},
							{
								path: '/dictmanage',
								name: 'dictmanage',
								meta: {
									title: '字典管理'
								},
								component: () => import('../components/System/SystemSetting/DictManage')
							},
							{
								path: '/adddict',
								name: 'adddict',
								meta: {
									title: '添加字典'
								},
								component: () => import('../components/System/SystemSetting/DictManage/AddDict')
							},
							{
								path: '/editdict',
								name: 'editdict',
								meta: {
									title: '编辑字典'
								},
								component: () => import('../components/System/SystemSetting/DictManage/EditDict')
							},
							{
								path: '/viewdict',
								name: 'viewdict',
								meta: {
									title: '查看字典'
								},
								component: () => import('../components/System/SystemSetting/DictManage/ViewDict')
							},
							{
								path: '/sysconfigmanage',
								name: 'sysconfigmanage',
								meta: {
									title: '系统配置'
								},
								component: () => import('../components/System/SystemSetting/SysConfigManage')
							},
							{
								path: '/addsysconfig',
								name: 'addsysconfig',
								meta: {
									title: '添加系统配置'
								},
								component: () => import('../components/System/SystemSetting/SysConfigManage/AddSysConfig')
							},
							{
								path: '/editsysconfig',
								name: 'editsysconfig',
								meta: {
									title: '编辑系统配置'
								},
								component: () => import('../components/System/SystemSetting/SysConfigManage/EditSysConfig')
							},
							{
								path: '/viewsysconfig',
								name: 'viewsysconfig',
								meta: {
									title: '查看系统配置'
								},
								component: () => import('../components/System/SystemSetting/SysConfigManage/ViewSysConfig')
							}
						]
					},
					{
						path: '/datamanage',
						name: 'datamanage',
						meta: {
							title: '数据管理'
						},
						component: () => import('../components/System/DataManage'),
						redirect: '/areamanage',
						children: [
							{
								path: '/areamanage',
								name: 'areamanage',
								meta: {
									title: '区域管理'
								},
								component: () => import('../components/System/DataManage/AreaManage')
							},
							{
								path: '/constmanage',
								name: 'constmanage',
								meta: {
									title: '标准常量'
								},
								component: () => import('../components/System/DataManage/ConstManage')
							},
							{
								path: '/addconstant',
								name: 'addconstant',
								meta: {
									title: '添加标准常量'
								},
								component: () => import('../components/System/DataManage/ConstManage/AddConstant')
							},
							{
								path: '/editconstant',
								name: 'editconstant',
								meta: {
									title: '编辑标准常量'
								},
								component: () => import('../components/System/DataManage/ConstManage/EditConstant')
							},
							{
								path: '/viewconstant',
								name: 'viewconstant',
								meta: {
									title: '查看标准常量'
								},
								component: () => import('../components/System/DataManage/ConstManage/ViewConstant')
							}
						]
					},
				]
			},
			{
				path: '/user',
				name: 'user',
				meta: {
					title: '个人资料'
				},
				component: () => import('../components/User'),
				redirect: '/userprofile',
				children: [
					{
						path: '/userprofile',
						name: 'userprofile',
						meta: {
							title: '用户信息'
						},
						component: () => import('../components/User/UserProfile')
					}
				]
			}
		]
	}
]

const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})

export default router
