const getters = {
	token: state => state.user.token,
	photo: state => state.user.photo,
	name: state => state.user.name,
	loginName: state => state.user.loginName,
	roles: state => state.user.roles,
	sidebar: state => state.app.sidebar,
	menus: state => state.menu.menus
}
export default getters