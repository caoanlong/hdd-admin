import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
	// start progress bar
	NProgress.start()
	// determine if there has token
	if (localStorage.getItem('token')) {
		/* has token*/
		if (to.path === '/login') {
			next({ path: '/' })
			// if current page is dashboard will not trigger afterEach hook, so manually handle it
			NProgress.done()
		} else {
			next()
			// if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
			// 	store.dispatch('GetUserInfo', getToken()).then(res => { // 拉取user_info
			// 		const roles = res.roles // note: roles must be a array! such as: ['editor','develop']
			// 		// store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
			// 		// 	router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
			// 		// 	next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
			// 		// })
			// 		next()
			// 	}).catch(error => {
			// 		console.error(error)
			// 		store.dispatch('FedLogOut').then(() => {
			// 			Message.error('认证失败，请重新登录！')
			// 			next({ path: '/login' })
			// 		})
			// 	})
			// } else {
			// 	// 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
			// 	if (hasPermission(store.getters.roles, to.meta.roles)) {
			// 		next()//
			// 	} else {
			// 		next({ path: '/401', replace: true, query: { noGoBack: true }})
			// 	}
			// 	// 可删 ↑
			// }
		}
	} else {
		/* has no token*/
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
		NProgress.done()
	}
})
router.afterEach(() => {
	NProgress.done() // finish progress bar
})
