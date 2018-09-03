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
				getUserInfo().then(response => {
					const data = response.data
					commit('SET_LOGIN_NAME', data.data.LoginName)
					commit('SET_NAME', data.data.Name)
					commit('SET_PHOTO', data.data.Photo)
					localStorage.setItem('LoginName', data.data.LoginName)
					localStorage.setItem('Name', data.data.Name)
					localStorage.setItem('Photo', data.data.Photo)
					resolve(data)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user