const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	roles: state => state.user.roles,
	sidebar: state => state.app.sidebar,
	permission_routers: state => state.permission.routers
}
export default getters