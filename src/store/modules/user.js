import { login, logout, getUserInfo } from '../../api/login'
import { getToken, setToken, removeToken } from '../../common/auth'
const user = {
	state: {
		name: '',
		code: '',
		token: getToken(),
		roles: [],
		avatar: ''
	},
	mutations: {
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		}
	},
	actions: {
		Login ({commit}, userInfo) {
			const username = userInfo.username.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login(username, password).then(response => {
					const data = response.data
					commit('SET_NAME', data.username)
					commit('SET_ROLES', data.roles.split(','))
					commit('SET_AVATAR', data.avatar)
					commit('SET_TOKEN', data.token)
					localStorage.setItem('username', data.username)
					localStorage.setItem('roles', data.roles)
					localStorage.setItem('avatar', data.avatar)
					setToken(data.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_NAME', '')
					commit('SET_ROLES', [])
					commit('SET_AVATAR', '')
					commit('SET_TOKEN', '')
					removeToken()
					localStorage.clear()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetUserInfo({ commit }, token) {
			return new Promise((resolve, reject) => {
				getUserInfo(token).then(response => {
					const data = response.data
					commit('SET_NAME', data.username)
					commit('SET_ROLES', data.roles)
					commit('SET_AVATAR', data.avatar)
					resolve(data)
				}).catch(error => {
					reject(error)
				})
			})
		},
		FedLogOut({ commit }) {
			return new Promise((resolve, reject) => {
				commit('SET_NAME', '')
				commit('SET_ROLES', [])
				commit('SET_AVATAR', '')
				commit('SET_TOKEN', '')
				removeToken()
				localStorage.clear()
				resolve()
			})
		}
	}
}

export default user