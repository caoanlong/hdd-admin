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
				component: () => import('../components/CarFreeCarrier'),
				redirect: '/cargouoload',
				children: [
					{
						path: '/cargoupload',
						name: 'cargoupload',
						meta: {
							title: '货源上传'
						},
						component: () => import('../components/CarFreeCarrier/CargoUpload')
					},
					{
						path: '/addcargo',
						name: 'addcargo',
						meta: {
							title: '添加货源'
						},
						component: () => import('../components/CarFreeCarrier/CargoUpload/AddCargo')
					},
					{
						path: '/viewcargo',
						name: 'viewcargo',
						meta: {
							title: '查看货源'
						},
						component: () => import('../components/CarFreeCarrier/CargoUpload/ViewCargo')
					},
					{
						path: '/editcargo',
						name: 'editcargo',
						meta: {
							title: '编辑货源'
						},
						component: () => import('../components/CarFreeCarrier/CargoUpload/EditCargo')
					},
					{
						path: '/truckupload',
						name: 'truckupload',
						meta: {
							title: '车源上传'
						},
						component: () => import('../components/CarFreeCarrier/TruckUpload')
					},
					{
						path: '/addtruck',
						name: 'addtruck',
						meta: {
							title: '添加车源'
						},
						component: () => import('../components/CarFreeCarrier/TruckUpload/AddTruck')
					},
					{
						path: '/viewtruck',
						name: 'viewtruck',
						meta: {
							title: '查看车源'
						},
						component: () => import('../components/CarFreeCarrier/TruckUpload/ViewTruck')
					},
					{
						path: '/edittruck',
						name: 'edittruck',
						meta: {
							title: '编辑车源'
						},
						component: () => import('../components/CarFreeCarrier/TruckUpload/EditTruck')
					},
					{
						path: '/waybillupload',
						name: 'waybillupload',
						meta: {
							title: '运单上传'
						},
						component: () => import('../components/CarFreeCarrier/WaybillUpload')
					},
					{
						path: '/addwaybill',
						name: 'addwaybill',
						meta: {
							title: '添加运单'
						},
						component: () => import('../components/CarFreeCarrier/WaybillUpload/AddWaybill')
					},
					{
						path: '/viewwaybill',
						name: 'viewwaybill',
						meta: {
							title: '查看运单'
						},
						component: () => import('../components/CarFreeCarrier/WaybillUpload/ViewWaybill')
					},
					{
						path: '/editwaybill',
						name: 'editwaybill',
						meta: {
							title: '编辑运单'
						},
						component: () => import('../components/CarFreeCarrier/WaybillUpload/EditWaybill')
					},
					{
						path: '/interfaceconfig',
						name: 'interfaceconfig',
						meta: {
							title: '无车承运接口配置'
						},
						component: () => import('../components/CarFreeCarrier/InterfaceConfig')
					},
					{
						path: '/addinterfaceconfig',
						name: 'addinterfaceconfig',
						meta: {
							title: '添加无车承运接口配置'
						},
						component: () => import('../components/CarFreeCarrier/InterfaceConfig/AddInterfaceConfig')
					},
					{
						path: '/editinterfaceconfig',
						name: 'editinterfaceconfig',
						meta: {
							title: '编辑无车承运接口配置'
						},
						component: () => import('../components/CarFreeCarrier/InterfaceConfig/EditInterfaceConfig')
					},
					{
						path: '/viewinterfaceconfig',
						name: 'viewinterfaceconfig',
						meta: {
							title: '查看无车承运接口配置'
						},
						component: () => import('../components/CarFreeCarrier/InterfaceConfig/ViewInterfaceConfig')
					},
				]
			},
			{
				path: '/customSevice',
				name: 'customSevice',
				meta: {
					title: '客服管理'
				},
				component: () => import('../components/CustomSevice'),
				redirect: '/memberCertify',
				children: [
					{
						path: '/memberCertify',
						name: 'memberCertify',
						meta: {
							title: '会员认证'
						},
						component: () => import('../components/CustomSevice/MemberCertify')
					},
					{
						path: '/viewpersioncertify',
						name: 'viewpersioncertify',
						meta: {
							title: '个人认证'
						},
						component: () => import('../components/CustomSevice/MemberCertify/ViewPersionCertify')
					},
					{
						path: '/viewcompanycertify',
						name: 'viewcompanycertify',
						meta: {
							title: '企业认证'
						},
						component: () => import('../components/CustomSevice/MemberCertify/ViewCompanyCertify')
					},
					{
						path: '/certification',
						name: 'certification',
						meta: {
							title: '实名认证'
						},
						component: () => import('../components/CustomSevice/Certification')
					},
					{
						path: '/viewcertification',
						name: 'viewcertification',
						meta: {
							title: '实名认证详情'
						},
						component: () => import('../components/CustomSevice/Certification/ViewCertification')
					},
					{
						path: '/withdraw',
						name: 'withdraw',
						meta: {
							title: '提现管理'
						},
						component: () => import('../components/CustomSevice/Withdraw')
					},
					{
						path: '/viewwithdraw',
						name: 'viewwithdraw',
						meta: {
							title: '提现详情'
						},
						component: () => import('../components/CustomSevice/Withdraw/ViewWithDraw')
					},
					{
						path: '/editwithdraw',
						name: 'editwithdraw',
						meta: {
							title: '提现审核'
						},
						component: () => import('../components/CustomSevice/Withdraw/EditWithdraw')
					},
					{
						path: '/apilog',
						name: 'apilog',
						meta: {
							title: 'API请求日志'
						},
						component: () => import('../components/CustomSevice/ApiLog')
					},
					{
						path: '/viewapilog',
						name: 'viewapilog',
						meta: {
							title: '查看API请求日志'
						},
						component: () => import('../components/CustomSevice/ApiLog/ViewApiLog')
					},
					{
						path: '/smslogs',
						name: 'smslogs',
						meta: {
							title: '短信日志'
						},
						component: () => import('../components/CustomSevice/SmsLogs')
					}
				]
			},
			{
				path: '/businessconfig',
				name: 'businessconfig',
				meta: {
					title: '业务配置'
				},
				component: () => import('../components/BusinessConfig'),
				redirect: '/contentmanage',
				children: [
					{
						path: '/contentmanage',
						name: 'contentmanage',
						meta: {
							title: '内容管理'
						},
						component: () => import('../components/BusinessConfig/ContentManage'),
						redirect: '/setcolumn',
						children: [
							{
								path: '/setcolumn',
								name: 'setcolumn',
								meta: {
									title: '设置栏目'
								},
								component: () => import('../components/BusinessConfig/ContentManage/SetColumn')
							},
							{
								path: '/setcontent',
								name: 'setcontent',
								meta: {
									title: '设置内容'
								},
								component: () => import('../components/BusinessConfig/ContentManage/SetContent')
							},
							{
								path: '/addcontent',
								name: 'addcontent',
								meta: {
									title: '添加内容'
								},
								component: () => import('../components/BusinessConfig/ContentManage/SetContent/AddContent')
							},
							{
								path: '/editcontent',
								name: 'editcontent',
								meta: {
									title: '编辑内容'
								},
								component: () => import('../components/BusinessConfig/ContentManage/SetContent/EditContent')
							}
						]
					},
					{
						path: '/messagemanage',
						name: 'messagemanage',
						meta: {
							title: '消息管理'
						},
						component: () => import('../components/BusinessConfig/MessageManage'),
						redirect: '/message',
						children: [
							{
								path: '/message',
								name: 'message',
								meta: {
									title: '消息'
								},
								component: () => import('../components/BusinessConfig/MessageManage/Message')
							},
							{
								path: '/messagetemp',
								name: 'messagetemp',
								meta: {
									title: '消息模板'
								},
								component: () => import('../components/BusinessConfig/MessageManage/MessageTemp')
							},
							{
								path: '/viewmessagetemp',
								name: 'viewmessagetemp',
								meta: {
									title: '查看消息模板'
								},
								component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/ViewMessageTemp')
							},
							{
								path: '/editmessagetemp',
								name: 'editmessagetemp',
								meta: {
									title: '编辑消息模板'
								},
								component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/EditMessageTemp')
							},
							{
								path: '/addmessagetemp',
								name: 'addmessagetemp',
								meta: {
									title: '添加消息模板'
								},
								component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/AddMessageTemp')
							},
						]
					},
					{
						path: '/queuemanage',
						name: 'queuemanage',
						meta: {
							title: '队列配置'
						},
						component: () => import('../components/BusinessConfig/QueueManage')
					},
					{
						path: '/addqueue',
						name: 'addqueue',
						meta: {
							title: '添加队列配置'
						},
						component: () => import('../components/BusinessConfig/QueueManage/AddQueue')
					},
					{
						path: '/viewqueue',
						name: 'viewqueue',
						meta: {
							title: '查看队列配置'
						},
						component: () => import('../components/BusinessConfig/QueueManage/ViewQueue')
					},
					{
						path: '/editqueue',
						name: 'editqueue',
						meta: {
							title: '编辑队列配置'
						},
						component: () => import('../components/BusinessConfig/QueueManage/EditQueue')
					},
					{
						path: '/apppage',
						name: 'apppage',
						meta: {
							title: 'APP页面'
						},
						component: () => import('../components/BusinessConfig/AppPage')
					},
					{
						path: '/banklist',
						name: 'banklist',
						meta: {
							title: '支持银行列表'
						},
						component: () => import('../components/BusinessConfig/BankList')
					},
					{
						path: '/addbank',
						name: 'addbank',
						meta: {
							title: '添加银行'
						},
						component: () => import('../components/BusinessConfig/BankList/AddBank')
					},
					{
						path: '/viewbank',
						name: 'viewbank',
						meta: {
							title: '查看银行'
						},
						component: () => import('../components/BusinessConfig/BankList/ViewBank')
					},
					{
						path: '/editbank',
						name: 'editbank',
						meta: {
							title: '编辑银行'
						},
						component: () => import('../components/BusinessConfig/BankList/EditBank')
					},
					{
						path: '/smstemp',
						name: 'smstemp',
						meta: {
							title: '短信模板'
						},
						component: () => import('../components/BusinessConfig/SmsTemp')
					},
					{
						path: '/viewsmstemp',
						name: 'viewsmstemp',
						meta: {
							title: '查看短信模板'
						},
						component: () => import('../components/BusinessConfig/SmsTemp/ViewSmsTemp')
					},
					{
						path: '/editsmstemp',
						name: 'editsmstemp',
						meta: {
							title: '编辑短信模板'
						},
						component: () => import('../components/BusinessConfig/SmsTemp/EditSmsTemp')
					},
					{
						path: '/addsmstemp',
						name: 'addsmstemp',
						meta: {
							title: '添加短信模板'
						},
						component: () => import('../components/BusinessConfig/SmsTemp/AddSmsTemp')
					},
					{
						path: '/taskmanage',
						name: 'taskmanage',
						meta: {
							title: '定时任务管理'
						},
						component: () => import('../components/BusinessConfig/TaskManage')
					},
					{
						path: '/addtask',
						name: 'addtask',
						meta: {
							title: '添加定时任务'
						},
						component: () => import('../components/BusinessConfig/TaskManage/AddTask')
					},
					{
						path: '/edittask',
						name: 'edittask',
						meta: {
							title: '编辑定时任务'
						},
						component: () => import('../components/BusinessConfig/TaskManage/EditTask')
					},
					{
						path: '/versionmanage',
						name: 'versionmanage',
						meta: {
							title: '版本管理'
						},
						component: () => import('../components/BusinessConfig/VersionManage')
					},
					{
						path: '/viewversion',
						name: 'viewversion',
						meta: {
							title: '查看App版本'
						},
						component: () => import('../components/BusinessConfig/VersionManage/ViewVersion')
					},
					{
						path: '/addversion',
						name: 'addversion',
						meta: {
							title: '添加App版本'
						},
						component: () => import('../components/BusinessConfig/VersionManage/AddVersion')
					},
					{
						path: '/editversion',
						name: 'editversion',
						meta: {
							title: '编辑App版本'
						},
						component: () => import('../components/BusinessConfig/VersionManage/EditVersion')
					}
				]
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
							},
							{
								path: '/truckbrand',
								name: 'truckbrand',
								meta: {
									title: '车辆品牌'
								},
								component: () => import('../components/System/DataManage/TruckBrand')
							}
						]
					},
					{
						path: '/systemmonitor',
						name: 'systemmonitor',
						meta: {
							title: '系统监控'
						},
						component: () => import('../components/System/SystemMonitor'),
						redirect: '/systemLog',
						children: [
							{
								path: '/systemLog',
								name: 'systemLog',
								meta: {
									title: '系统日志'
								},
								component: () => import('../components/System/SystemMonitor/SystemLog')
							}
						]
					},
					{
						path: '/transaction',
						name: 'transaction',
						meta: {
							title: '交易管理'
						},
						component: () => import('../components/Transaction'),
						redirect: '/transactionlog',
						children: [
							{
								path: '/transactionlog',
								name: 'transactionlog',
								meta: {
									title: '会员交易流水'
								},
								component: () => import('../components/Transaction/TransactionLog')
							},
							{
								path: '/transactionsms',
								name: 'transactionsms',
								meta: {
									title: '交易短信日志'
								},
								component: () => import('../components/Transaction/TransactionSms')
							},
							{
								path: '/paymentslog',
								name: 'paymentslog',
								meta: {
									title: '支付接口日志'
								},
								component: () => import('../components/Transaction/PaymentsLog')
							},
							{
								path: '/platformtransactionlog',
								name: 'platformtransactionlog',
								meta: {
									title: '平台交易流水'
								},
								component: () => import('../components/Transaction/PlatformTransactionLog')
							}
						]
					}
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
