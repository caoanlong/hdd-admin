import { login } from '../../api/login'
import SysUser from '../../api/SysUser'

const user = {
	state: {
		name: localStorage.getItem('name'),
		loginName: localStorage.getItem('loginName'),
		token: localStorage.getItem('token'),
		photo: localStorage.getItem('photo')
	},
	mutations: {
		SET_LOGIN_NAME: (state, loginName) => {
			state.loginName = loginName
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_PHOTO: (state, photo) => {
			state.photo = photo
		}
	},
	actions: {
		Login ({commit}, userInfo) {
			const LoginName = userInfo.LoginName.trim()
			const Password = userInfo.Password
			return new Promise((resolve, reject) => {
				login(LoginName, Password).then(response => {
					let data = response.data
					if (data.code == 200) {
						commit('SET_TOKEN', response.headers['authorization'])
						localStorage.setItem('token', response.headers['authorization'])
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
				commit('SET_LOGIN_NAME', '')
				commit('SET_NAME', '')
				commit('SET_PHOTO', '')
				commit('SET_TOKEN', '')
				localStorage.clear()
				sessionStorage.clear()
				resolve()
			})
		},
		GetUserInfo({ commit }) {
			return new Promise((resolve, reject) => {
				SysUser.userInfo().then(res => {
					commit('SET_LOGIN_NAME', res.loginName)
					commit('SET_NAME', res.name)
					commit('SET_PHOTO', res.photo)
					localStorage.setItem('loginName', res.loginName)
					localStorage.setItem('name', res.name)
					localStorage.setItem('photo', res.photo)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user