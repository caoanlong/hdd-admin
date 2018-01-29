import request from '../common/request'

export function login(name, password) {
	const data = {
		name,
		password
	}
	return request({
		url: '/login',
		method: 'post',
		data
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
	return request({
		url: '/user/info',
		method: 'get',
		params: { token }
	})
}