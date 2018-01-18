import request from '../common/request'

export function login(username, password) {
	// const data = {
	// 	username,
	// 	password
	// }
	// return request({
	// 	url: '/login/login',
	// 	method: 'post',
	// 	data
	// })
	return new Promise((resolve, reject) => {
		if (!username) {
			reject('请输入用户名！')
			return
		}
		if (!password) {
			reject('请输入密码！')
			return
		}
		resolve({
			data: {
				username: username,
				roles: 'admin,editor',
				avatar: '',
				token: parseInt(Math.random() * 10000)
			}
		})
	})
}

export function logout() {
	// return request({
	// 	url: '/login/logout',
	// 	method: 'post'
	// })
	return new Promise((resolve, reject) => {
		resolve({code: 0})
	})
}

export function getUserInfo(token) {
	// return request({
	// 	url: '/user/info',
	// 	method: 'get',
	// 	params: { token }
	// })
	return new Promise((resolve, reject) => {
		resolve({
			data: {
				username: localStorage.getItem('username'),
				roles: localStorage.getItem('roles').split(','),
				avatar: localStorage.getItem('avatar')
			}
		})
	})
}