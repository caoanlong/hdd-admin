import { routerMap, asyncRouterMap } from '../../router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role))
	} else {
		return true
	}
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routers
 * @param roles
 */
function filterAsyncRouter(routers, roles) {
	const accessedRouters = routers.filter(route => {
		if (hasPermission(roles, route)) {
			if (route.children && route.children.length) {
				route.children = filterAsyncRouter(route.children, roles)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

const permission = {
	state: {
		routers: asyncRouterMap,
		addRouters: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = asyncRouterMap
		}
	},
	actions: {
		GenerateRoutes({ commit }, data) {
			return new Promise(resolve => {
				const { roles } = data
				let accessedRouters
				if (roles.includes('admin')) {
					accessedRouters = asyncRouterMap
				} else {
					accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
				}
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		}
	}
}

export default permission
