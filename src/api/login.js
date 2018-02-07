import request from '../common/request'

export function login(LoginName, Password) {
	const data = {
		LoginName,
		Password
	}
	return request({
		url: '/user/login',
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