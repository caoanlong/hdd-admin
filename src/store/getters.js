const getters = {
	token: state => state.user.token,
	Photo: state => state.user.Photo,
	Name: state => state.user.Name,
	LoginName: state => state.user.LoginName,
	roles: state => state.user.roles,
	sidebar: state => state.app.sidebar,
	menus: state => state.menu.menus,
	// permission_routers: state => state.permission.routers,
	// addRouters: state => state.permission.addRouters,
	errorLogs: state => state.errorLog.logs
}
export default getters