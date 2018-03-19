import request from '../common/request'
import requestJava from '../common/requestJava'

export function login(username, password) {
	const data = {
		username,
		password
	}
	return requestJava({
		url: '/mem/login',
		method: 'post',
		data
	})
}

export function logout() {
	return new Promise((resolve, reject) => {
		resolve({code: 0})
	})
}

export function getUserInfo() {
	return request({
		url: '/user/info',
		method: 'get'
	})
}