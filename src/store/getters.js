const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	username: state => state.user.username,
	roles: state => state.user.roles,
	sidebar: state => state.app.sidebar,
	menus: state => state.menu.menus,
	// permission_routers: state => state.permission.routers,
	// addRouters: state => state.permission.addRouters,
	errorLogs: state => state.errorLog.logs
}
export default getters