import { login } from '../../api/login'
import { getToken, setToken, removeToken } from '../../common/auth'
const user = {
	state: {
		user: '',
		name: '',
		code: '',
		token: '',
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
					commit('SET_TOKEN', data.token)
          			setToken(data.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user