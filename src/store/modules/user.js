import { login, logout, getUserInfo } from '../../api/login'

const user = {
	state: {
		Name: localStorage.getItem('Name'),
		LoginName: localStorage.getItem('LoginName'),
		token: localStorage.getItem('token'),
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
		SET_PHOTO: (state, Photo) => {
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
						commit('SET_TOKEN', response.headers['x-access-token'])
						commit('SET_LOGIN_NAME', data.data.LoginName)
						commit('SET_NAME', data.data.Name)
						commit('SET_PHOTO', data.data.Photo)
						localStorage.setItem('token', response.headers['x-access-token'])
						localStorage.setItem('LoginName', data.data.LoginName)
						localStorage.setItem('Name', data.data.Name)
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
					commit('SET_PHOTO', '')
					commit('SET_TOKEN', '')
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
					commit('SET_PHOTO', data.Photo)
					resolve(data)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user