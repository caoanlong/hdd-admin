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
