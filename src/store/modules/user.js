import { login, logout, getUserInfo } from '../../api/login'
import { getToken, setToken, removeToken } from '../../common/auth'
const user = {
	state: {
		name: localStorage.getItem('name'),
		token: getToken(),
		role: localStorage.getItem('role'),
		avatar: localStorage.getItem('avatar')
	},
	mutations: {
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLE: (state, role) => {
			state.role = role
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		}
	},
	actions: {
		Login ({commit}, userInfo) {
			const name = userInfo.name.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login(name, password).then(response => {
					let data = response.data
					if (data.code == 0) {
						console.log(data)
						localStorage.setItem('name', data.data.name)
						localStorage.setItem('role', data.data.role)
						localStorage.setItem('avatar', data.data.avatar)
						setToken(data.token)
						resolve(data.data)
					} else {
						reject(data.msg)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_NAME', '')
					commit('SET_ROLE', '')
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
					commit('SET_ROLE', data.role)
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
				commit('SET_ROLE', [])
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