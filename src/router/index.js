import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Temp404 from '@/components/404'

Vue.use(Router)

const routerMap = [
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
				meta: { title: '首页' },
				component: () => import('../components/Home')
			},
			/**
			 * 无车承运人  carfreecarrier
			 */
			{
				path: '/cargoupload',
				name: 'cargoupload',
				meta: { title: '货源上传' },
				component: () => import('../components/CarFreeCarrier/CargoUpload')
			},
			{
				path: '/addcargo',
				name: 'addcargo',
				meta: { title: '添加货源' },
				component: () => import('../components/CarFreeCarrier/CargoUpload/AddCargo')
			},
			{
				path: '/viewcargo',
				name: 'viewcargo',
				meta: { title: '查看货源' },
				component: () => import('../components/CarFreeCarrier/CargoUpload/ViewCargo')
			},
			{
				path: '/editcargo',
				name: 'editcargo',
				meta: { title: '编辑货源' },
				component: () => import('../components/CarFreeCarrier/CargoUpload/EditCargo')
			},
			{
				path: '/truckupload',
				name: 'truckupload',
				meta: { title: '车源上传' },
				component: () => import('../components/CarFreeCarrier/TruckUpload')
			},
			{
				path: '/addtruck',
				name: 'addtruck',
				meta: { title: '添加车源' },
				component: () => import('../components/CarFreeCarrier/TruckUpload/AddTruck')
			},
			{
				path: '/viewtruck',
				name: 'viewtruck',
				meta: { title: '查看车源' },
				component: () => import('../components/CarFreeCarrier/TruckUpload/ViewTruck')
			},
			{
				path: '/edittruck',
				name: 'edittruck',
				meta: { title: '编辑车源' },
				component: () => import('../components/CarFreeCarrier/TruckUpload/EditTruck')
			},
			{
				path: '/waybillupload',
				name: 'waybillupload',
				meta: { title: '运单上传' },
				component: () => import('../components/CarFreeCarrier/WaybillUpload')
			},
			{
				path: '/addwaybill',
				name: 'addwaybill',
				meta: { title: '添加运单' },
				component: () => import('../components/CarFreeCarrier/WaybillUpload/AddWaybill')
			},
			{
				path: '/viewwaybill',
				name: 'viewwaybill',
				meta: { title: '查看运单' },
				component: () => import('../components/CarFreeCarrier/WaybillUpload/ViewWaybill')
			},
			{
				path: '/editwaybill',
				name: 'editwaybill',
				meta: { title: '编辑运单' },
				component: () => import('../components/CarFreeCarrier/WaybillUpload/EditWaybill')
			},
			{
				path: '/interfaceconfig',
				name: 'interfaceconfig',
				meta: { title: '无车承运接口配置' },
				component: () => import('../components/CarFreeCarrier/InterfaceConfig')
			},
			{
				path: '/addinterfaceconfig',
				name: 'addinterfaceconfig',
				meta: { title: '添加无车承运接口配置' },
				component: () => import('../components/CarFreeCarrier/InterfaceConfig/AddInterfaceConfig')
			},
			{
				path: '/editinterfaceconfig',
				name: 'editinterfaceconfig',
				meta: { title: '编辑无车承运接口配置' },
				component: () => import('../components/CarFreeCarrier/InterfaceConfig/EditInterfaceConfig')
			},
			{
				path: '/viewinterfaceconfig',
				name: 'viewinterfaceconfig',
				meta: { title: '查看无车承运接口配置' },
				component: () => import('../components/CarFreeCarrier/InterfaceConfig/ViewInterfaceConfig')
			},
			/**
			 * 客服管理  customsevice
			 */
			{
				path: '/membercertify',
				name: 'membercertify',
				meta: { title: '会员认证' },
				component: () => import('../components/CustomSevice/MemberCertify')
			},
			{
				path: '/viewpersioncertify',
				name: 'viewpersioncertify',
				meta: { title: '个人认证' },
				component: () => import('../components/CustomSevice/MemberCertify/ViewPersionCertify')
			},
			{
				path: '/viewcompanycertify',
				name: 'viewcompanycertify',
				meta: { title: '企业认证' },
				component: () => import('../components/CustomSevice/MemberCertify/ViewCompanyCertify')
			},
			{
				path: '/viewtruckcertify',
				name: 'viewtruckcertify',
				meta: { title: '车辆认证' },
				component: () => import('../components/CustomSevice/MemberCertify/ViewTruckCertify')
			},
			{
				path: '/certification',
				name: 'certification',
				meta: { title: '实名认证' },
				component: () => import('../components/CustomSevice/Certification')
			},
			{
				path: '/viewcertification',
				name: 'viewcertification',
				meta: { title: '实名认证详情' },
				component: () => import('../components/CustomSevice/Certification/ViewCertification')
			},
			{
				path: '/merchantcertify',
				name: 'merchantcertify',
				meta: { title: '商户认证' },
				component: () => import('../components/CustomSevice/MerchantCertify')
			},
			{
				path: '/viewmerchantcertify',
				name: 'viewmerchantcertify',
				meta: { title: '商户认证详情' },
				component: () => import('../components/CustomSevice/MerchantCertify/ViewMerchantCertify')
			},
			{
				path: '/withdraw',
				name: 'withdraw',
				meta: { title: '提现管理' },
				component: () => import('../components/CustomSevice/Withdraw')
			},
			{
				path: '/viewwithdraw',
				name: 'viewwithdraw',
				meta: { title: '提现详情' },
				component: () => import('../components/CustomSevice/Withdraw/ViewWithdraw')
			},
			{
				path: '/editwithdraw',
				name: 'editwithdraw',
				meta: { title: '提现审核' },
				component: () => import('../components/CustomSevice/Withdraw/EditWithdraw')
			},
			{
				path: '/apilog',
				name: 'apilog',
				meta: { title: 'API请求日志' },
				component: () => import('../components/CustomSevice/ApiLog')
			},
			{
				path: '/viewapilog',
				name: 'viewapilog',
				meta: { title: '查看API请求日志' },
				component: () => import('../components/CustomSevice/ApiLog/ViewApiLog')
			},
			{
				path: '/smslogs',
				name: 'smslogs',
				meta: { title: '短信日志' },
				component: () => import('../components/CustomSevice/SmsLogs')
			},
			/**
			 * 业务配置   businessconfig
			 */
			{
				path: '/appcustomer',
				name: 'appcustomer',
				meta: { title: 'App客户' },
				component: () => import('../components/BusinessConfig/AppCustomer'),
			},
			{
				path: '/appmanage',
				name: 'appmanage',
				meta: { title: 'App管理' },
				component: () => import('../components/BusinessConfig/AppManage'),
			},
			{
				path: '/addapp',
				name: 'addapp',
				meta: { title: '添加App' },
				component: () => import('../components/BusinessConfig/AppManage/Add'),
			},
			{
				path: '/editapp',
				name: 'editapp',
				meta: { title: '编辑App' },
				component: () => import('../components/BusinessConfig/AppManage/Edit'),
			},
			{
				path: '/viewapp',
				name: 'viewapp',
				meta: { title: '查看App' },
				component: () => import('../components/BusinessConfig/AppManage/View'),
			},
			// 内容管理  contentmanage
			{
				path: '/setcolumn',
				name: 'setcolumn',
				meta: { title: '设置栏目' },
				component: () => import('../components/BusinessConfig/ContentManage/SetColumn')
			},
			{
				path: '/setcontent',
				name: 'setcontent',
				meta: { title: '设置内容' },
				component: () => import('../components/BusinessConfig/ContentManage/SetContent')
			},
			{
				path: '/addcontent',
				name: 'addcontent',
				meta: { title: '添加内容' },
				component: () => import('../components/BusinessConfig/ContentManage/SetContent/AddContent')
			},
			{
				path: '/editcontent',
				name: 'editcontent',
				meta: { title: '编辑内容' },
				component: () => import('../components/BusinessConfig/ContentManage/SetContent/EditContent')
			},
			// 消息管理  messagemanage
			{
				path: '/message',
				name: 'message',
				meta: { title: '消息' },
				component: () => import('../components/BusinessConfig/MessageManage/Message')
			},
			{
				path: '/viewmessage',
				name: 'viewmessage',
				meta: { title: '查看消息' },
				component: () => import('../components/BusinessConfig/MessageManage/Message/ViewMessage')
			},
			{
				path: '/messagetemp',
				name: 'messagetemp',
				meta: { title: '消息模板' },
				component: () => import('../components/BusinessConfig/MessageManage/MessageTemp')
			},
			{
				path: '/viewmessagetemp',
				name: 'viewmessagetemp',
				meta: { title: '查看消息模板' },
				component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/ViewMessageTemp')
			},
			{
				path: '/editmessagetemp',
				name: 'editmessagetemp',
				meta: { title: '编辑消息模板' },
				component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/EditMessageTemp')
			},
			{
				path: '/addmessagetemp',
				name: 'addmessagetemp',
				meta: { title: '添加消息模板' },
				component: () => import('../components/BusinessConfig/MessageManage/MessageTemp/AddMessageTemp')
			},
			{
				path: '/queuemanage',
				name: 'queuemanage',
				meta: { title: '队列配置' },
				component: () => import('../components/BusinessConfig/QueueManage')
			},
			{
				path: '/addqueue',
				name: 'addqueue',
				meta: { title: '添加队列配置' },
				component: () => import('../components/BusinessConfig/QueueManage/AddQueue')
			},
			{
				path: '/viewqueue',
				name: 'viewqueue',
				meta: { title: '查看队列配置' },
				component: () => import('../components/BusinessConfig/QueueManage/ViewQueue')
			},
			{
				path: '/editqueue',
				name: 'editqueue',
				meta: { title: '编辑队列配置' },
				component: () => import('../components/BusinessConfig/QueueManage/EditQueue')
			},
			{
				path: '/apppage',
				name: 'apppage',
				meta: { title: 'APP页面' },
				component: () => import('../components/BusinessConfig/AppPage')
			},
			{
				path: '/banklist',
				name: 'banklist',
				meta: { title: '支持银行列表' },
				component: () => import('../components/BusinessConfig/BankList')
			},
			{
				path: '/addbank',
				name: 'addbank',
				meta: { title: '添加银行' },
				component: () => import('../components/BusinessConfig/BankList/AddBank')
			},
			{
				path: '/viewbank',
				name: 'viewbank',
				meta: { title: '查看银行' },
				component: () => import('../components/BusinessConfig/BankList/ViewBank')
			},
			{
				path: '/editbank',
				name: 'editbank',
				meta: { title: '编辑银行' },
				component: () => import('../components/BusinessConfig/BankList/EditBank')
			},
			{
				path: '/smstemp',
				name: 'smstemp',
				meta: { title: '短信模板' },
				component: () => import('../components/BusinessConfig/SmsTemp')
			},
			{
				path: '/viewsmstemp',
				name: 'viewsmstemp',
				meta: { title: '查看短信模板' },
				component: () => import('../components/BusinessConfig/SmsTemp/ViewSmsTemp')
			},
			{
				path: '/editsmstemp',
				name: 'editsmstemp',
				meta: { title: '编辑短信模板' },
				component: () => import('../components/BusinessConfig/SmsTemp/EditSmsTemp')
			},
			{
				path: '/addsmstemp',
				name: 'addsmstemp',
				meta: { title: '添加短信模板' },
				component: () => import('../components/BusinessConfig/SmsTemp/AddSmsTemp')
			},
			{
				path: '/taskmanage',
				name: 'taskmanage',
				meta: { title: '定时任务管理' },
				component: () => import('../components/BusinessConfig/TaskManage')
			},
			{
				path: '/addtask',
				name: 'addtask',
				meta: { title: '添加定时任务' },
				component: () => import('../components/BusinessConfig/TaskManage/AddTask')
			},
			{
				path: '/edittask',
				name: 'edittask',
				meta: { title: '编辑定时任务' },
				component: () => import('../components/BusinessConfig/TaskManage/EditTask')
			},
			{
				path: '/versionmanage',
				name: 'versionmanage',
				meta: { title: '版本管理' },
				component: () => import('../components/BusinessConfig/VersionManage')
			},
			{
				path: '/viewversion',
				name: 'viewversion',
				meta: { title: '查看App版本' },
				component: () => import('../components/BusinessConfig/VersionManage/ViewVersion')
			},
			{
				path: '/addversion',
				name: 'addversion',
				meta: { title: '添加App版本' },
				component: () => import('../components/BusinessConfig/VersionManage/AddVersion')
			},
			{
				path: '/editversion',
				name: 'editversion',
				meta: { title: '编辑App版本' },
				component: () => import('../components/BusinessConfig/VersionManage/EditVersion')
			},
			/**
			 * 系统管理  system
			 */
			// 系统设置  systemsetting
			{
				path: '/menumanage',
				name: 'menumanage',
				meta: { title: '菜单管理' },
				component: () => import('../components/System/SystemSetting/MenuManage')
			},
			{
				path: '/usermanage',
				name: 'usermanage',
				meta: { title: '用户管理' },
				component: () => import('../components/System/SystemSetting/UserManage')
			},
			{
				path: '/adduser',
				name: 'adduser',
				meta: { title: '添加用户' },
				component: () => import('../components/System/SystemSetting/UserManage/AddUser')
			},
			{
				path: '/edituser',
				name: 'edituser',
				meta: { title: '编辑用户' },
				component: () => import('../components/System/SystemSetting/UserManage/EditUser')
			},
			{
				path: '/viewuser',
				name: 'viewuser',
				meta: { title: '查看用户' },
				component: () => import('../components/System/SystemSetting/UserManage/ViewUser')
			},
			{
				path: '/rolemanage',
				name: 'rolemanage',
				meta: { title: '角色管理' },
				component: () => import('../components/System/SystemSetting/RoleManage')
			},
			{
				path: '/addrole',
				name: 'addrole',
				meta: { title: '添加角色' },
				component: () => import('../components/System/SystemSetting/RoleManage/AddRole')
			},
			{
				path: '/editrole',
				name: 'editrole',
				meta: { title: '编辑角色' },
				component: () => import('../components/System/SystemSetting/RoleManage/EditRole')
			},
			{
				path: '/viewrole',
				name: 'viewrole',
				meta: { title: '查看角色' },
				component: () => import('../components/System/SystemSetting/RoleManage/ViewRole')
			},
			{
				path: '/orgmange',
				name: 'orgmange',
				meta: { title: '机构管理' },
				component: () => import('../components/System/SystemSetting/OrgManage')
			},
			{
				path: '/dictmanage',
				name: 'dictmanage',
				meta: { title: '字典管理' },
				component: () => import('../components/System/SystemSetting/DictManage')
			},
			{
				path: '/adddict',
				name: 'adddict',
				meta: { title: '添加字典' },
				component: () => import('../components/System/SystemSetting/DictManage/AddDict')
			},
			{
				path: '/editdict',
				name: 'editdict',
				meta: { title: '编辑字典' },
				component: () => import('../components/System/SystemSetting/DictManage/EditDict')
			},
			{
				path: '/viewdict',
				name: 'viewdict',
				meta: { title: '查看字典' },
				component: () => import('../components/System/SystemSetting/DictManage/ViewDict')
			},
			{
				path: '/sysconfigmanage',
				name: 'sysconfigmanage',
				meta: { title: '系统配置' },
				component: () => import('../components/System/SystemSetting/SysConfigManage')
			},
			{
				path: '/addsysconfig',
				name: 'addsysconfig',
				meta: { title: '添加系统配置' },
				component: () => import('../components/System/SystemSetting/SysConfigManage/AddSysConfig')
			},
			{
				path: '/editsysconfig',
				name: 'editsysconfig',
				meta: { title: '编辑系统配置' },
				component: () => import('../components/System/SystemSetting/SysConfigManage/EditSysConfig')
			},
			{
				path: '/viewsysconfig',
				name: 'viewsysconfig',
				meta: { title: '查看系统配置' },
				component: () => import('../components/System/SystemSetting/SysConfigManage/ViewSysConfig')
			},
			// 数据管理  datamanage
			{
				path: '/areamanage',
				name: 'areamanage',
				meta: { title: '区域管理' },
				component: () => import('../components/System/DataManage/AreaManage')
			},
			{
				path: '/constmanage',
				name: 'constmanage',
				meta: { title: '标准常量' },
				component: () => import('../components/System/DataManage/ConstManage')
			},
			{
				path: '/addconstant',
				name: 'addconstant',
				meta: { title: '添加标准常量' },
				component: () => import('../components/System/DataManage/ConstManage/AddConstant')
			},
			{
				path: '/editconstant',
				name: 'editconstant',
				meta: { title: '编辑标准常量' },
				component: () => import('../components/System/DataManage/ConstManage/EditConstant')
			},
			{
				path: '/viewconstant',
				name: 'viewconstant',
				meta: { title: '查看标准常量' },
				component: () => import('../components/System/DataManage/ConstManage/ViewConstant')
			},
			{
				path: '/truckbrand',
				name: 'truckbrand',
				meta: { title: '车辆品牌' },
				component: () => import('../components/System/DataManage/TruckBrand')
			},
			{
				path: '/addtruckbrand',
				name: 'addtruckbrand',
				meta: { title: '添加车辆品牌' },
				component: () => import('../components/System/DataManage/TruckBrand/AddTruckBrand')
			},
			{
				path: '/edittruckbrand',
				name: 'edittruckbrand',
				meta: { title: '编辑车辆品牌' },
				component: () => import('../components/System/DataManage/TruckBrand/EditTruckBrand')
			},
			{
				path: '/viewtruckbrand',
				name: 'viewtruckbrand',
				meta: { title: '查看车辆品牌' },
				component: () => import('../components/System/DataManage/TruckBrand/ViewTruckBrand')
			},
			// 系统监控   systemmonitor
			{
				path: '/systemLog',
				name: 'systemLog',
				meta: { title: '系统日志' },
				component: () => import('../components/System/SystemMonitor/SystemLog')
			},
			// 交易管理  transaction
			{
				path: '/transactionlog',
				name: 'transactionlog',
				meta: { title: '会员交易流水' },
				component: () => import('../components/Transaction/TransactionLog')
			},
			{
				path: '/transactionsms',
				name: 'transactionsms',
				meta: { title: '交易短信日志' },
				component: () => import('../components/Transaction/TransactionSms')
			},
			{
				path: '/paymentslog',
				name: 'paymentslog',
				meta: { title: '支付接口日志' },
				component: () => import('../components/Transaction/PaymentsLog')
			},
			{
				path: '/platformtranslog',
				name: 'platformtranslog',
				meta: { title: '平台交易流水' },
				component: () => import('../components/Transaction/PlatformTransactionLog')
			},
			/**
			 * TMS管理  tms
			 */
			// 会员管理  tmsmemmanage
			{
				path: '/tmsusermanage',
				name: 'tmsusermanage',
				meta: { title: '用户管理' },
				component: () => import('../components/Tms/MemManage/UserManage')
			},
			{
				path: '/tmsviewusermanage',
				name: 'tmsviewusermanage',
				meta: { title: '查看用户' },
				component: () => import('../components/Tms/MemManage/UserManage/ViewUserManage')
			},
			{
				path: '/tmsarchivemanage',
				name: 'tmsarchivemanage',
				meta: { title: '档案管理' },
				component: () => import('../components/Tms/MemManage/ArchiveManage')
			},
			{
				path: '/viewtmsarchive',
				name: 'viewtmsarchive',
				meta: { title: '查看档案' },
				component: () => import('../components/Tms/MemManage/ArchiveManage/ViewTmsArchive')
			},
			{
				path: '/tmstruckmanage',
				name: 'tmstruckmanage',
				meta: { title: '车辆管理' },
				component: () => import('../components/Tms/MemManage/TruckManage')
			},
			{
				path: '/viewtmstruck',
				name: 'viewtmstruck',
				meta: { title: '车辆详情' },
				component: () => import('../components/Tms/MemManage/TruckManage/ViewTmsTruck')
			},
			{
				path: '/tmspersonmanage',
				name: 'tmspersonmanage',
				meta: { title: '人员管理' },
				component: () => import('../components/Tms/MemManage/PersonManage')
			},
			{
				path: '/viewtmsperson',
				name: 'viewtmsperson',
				meta: { title: '人员详情' },
				component: () => import('../components/Tms/MemManage/PersonManage/ViewTmsPerson')
			},
			{
				path: '/tmsshippermanage',
				name: 'tmsshippermanage',
				meta: { title: '托运人管理' },
				component: () => import('../components/Tms/MemManage/ShipperManage')
			},
			{
				path: '/viewtmsshipper',
				name: 'viewtmsshipper',
				meta: { title: '托运人详情' },
				component: () => import('../components/Tms/MemManage/ShipperManage/ViewTmsShipper')
			},
			{
				path: '/tmsrecdeliverycomp',
				name: 'tmsrecdeliverycomp',
				meta: { title: '收发货单位' },
				component: () => import('../components/Tms/MemManage/RecDeliveryComp')
			},
			{
				path: '/viewtmsrecdeliverycomp',
				name: 'viewtmsrecdeliverycomp',
				meta: { title: '收发货单位详情' },
				component: () => import('../components/Tms/MemManage/RecDeliveryComp/ViewTmsRecDeliveryComp')
			},
			{
				path: '/tmscarrierbill',
				name: 'tmscarrierbill',
				meta: { title: '承运单管理' },
				component: () => import('../components/Tms/CarrierbillManage')
			},
			{
				path: '/viewtmscarrierbill',
				name: 'viewtmscarrierbill',
				meta: { title: '承运单详情' },
				component: () => import('../components/Tms/CarrierbillManage/ViewCarrierbill')
			},
			{
				path: '/tmsdispatchbill',
				name: 'tmsdispatchbill',
				meta: { title: '调度单管理' },
				component: () => import('../components/Tms/DispatchbillManage')
			},
			{
				path: '/viewtmsdispatchbill',
				name: 'viewtmsdispatchbill',
				meta: { title: '调度单详情' },
				component: () => import('../components/Tms/DispatchbillManage/ViewDispatchBill')
			},
			// 结算管理 tmssettlemanage
			{
				path: '/tmsreceivable',
				name: 'tmsreceivable',
				meta: { title: '应收管理' },
				component: () => import('../components/Tms/SettleManage/receivable')
			},
			{
				path: '/tmspayable',
				name: 'tmspayable',
				meta: { title: '应付管理' },
				component: () => import('../components/Tms/SettleManage/payable')
			},
			{
				path: '/tmssettleconfig',
				name: 'tmssettleconfig',
				meta: { title: '结算模板' },
				component: () => import('../components/Tms/SettleManage/settleconfig')
			},
			{
				path: '/viewtmssettleconfig',
				name: 'viewtmssettleconfig',
				meta: { title: '查看结算模板' },
				component: () => import('../components/Tms/SettleManage/settleconfig/ViewSettleConfig')
			},
			// TMS系统管理  tmssysmanage
			{
				path: '/tmsconstmanage',
				name: 'tmsconstmanage',
				meta: { title: 'TMS常量管理' },
				component: () => import('../components/Tms/SystemManage/ConstManage')
			},
			{
				path: '/viewtmsconst',
				name: 'viewtmsconst',
				meta: { title: '查看TMS常量' },
				component: () => import('../components/Tms/SystemManage/ConstManage/ViewConst')
			},
			{
				path: '/addtmsconst',
				name: 'addtmsconst',
				meta: { title: '添加TMS常量' },
				component: () => import('../components/Tms/SystemManage/ConstManage/AddConst')
			},
			{
				path: '/edittmsconst',
				name: 'edittmsconst',
				meta: { title: '编辑TMS常量' },
				component: () => import('../components/Tms/SystemManage/ConstManage/EditConst')
			},
			// 用户信息  userprofile
			{
				path: '/userprofile',
				name: 'userprofile',
				meta: { title: '用户信息' },
				component: () => import('../components/User/UserProfile')
			}
		]
	}
]

const router = new Router({
	scrollBehavior: () => ({ y: 0 }),
	routes: routerMap
})

router.beforeEach((to, from, next) => {
	if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
		if (to.path === '/login') {
			next({ path: '/' })
		} else {
			next()
		}
	} else {
		/* has no token*/
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
	}
})

export default router
