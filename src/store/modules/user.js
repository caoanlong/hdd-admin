import { login, logout, getUserInfo } from '../../api/login'
import { getToken, setToken, removeToken } from '../../common/auth'
const user = {
	state: {
		Name: localStorage.getItem('Name'),
		LoginName: localStorage.getItem('LoginName'),
		token: getToken(),
		// role: localStorage.getItem('role'),
		Photo: localStorage.getItem('Photo')
	},
	mutations: {
		SET_LOGIN_NAME: (state, LoginName) => {
			state.LoginName = LoginName
		},
		SET_NAME: (state, Name) => {
			state.Name = Name
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLE: (state, role) => {
			state.role = role
		},
		SET_AVATAR: (state, Photo) => {
			state.Photo = Photo
		}
	},
	actions: {
		Login ({commit}, userInfo) {
			const LoginName = userInfo.LoginName.trim()
			const Password = userInfo.Password
			return new Promise((resolve, reject) => {
				login(LoginName, Password).then(response => {
					let data = response.data
					if (data.code == 0) {
						console.log(data)
						setToken(response.headers['x-access-token'])
						localStorage.setItem('Name', data.data.Name)
						localStorage.setItem('LoginName', data.data.LoginName)
						// localStorage.setItem('role', data.data.role)
						localStorage.setItem('Photo', data.data.Photo)
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
					commit('SET_LOGIN_NAME', '')
					commit('SET_NAME', '')
					// commit('SET_ROLE', '')
					commit('SET_AVATAR', '')
					commit('SET_TOKEN', '')
					removeToken()
					localStorage.clear()
					sessionStorage.clear()
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
					commit('SET_LOGIN_NAME', data.LoginName)
					commit('SET_NAME', data.Name)
					// commit('SET_ROLE', data.role)
					commit('SET_AVATAR', data.Photo)
					resolve(data)
				}).catch(error => {
					reject(error)
				})
			})
		},
		FedLogOut({ commit }) {
			return new Promise((resolve, reject) => {
				commit('SET_NAME', '')
				// commit('SET_ROLE', [])
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