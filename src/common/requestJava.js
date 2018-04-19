import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'

// 杨霞
// export const javaUrl = 'http://192.168.1.68:9898'
// 张颜
// export const javaUrl = 'http://192.168.1.29:9898'
// 农信卡
// export const javaUrl = 'http://192.168.1.49:9898'
export const javaUrl = 'http://192.168.1.48:9898'  // 测试环境
// export const javaUrl = 'http://tms.develop.we-service.cn/tms-admin-practice' // 演练环境
export const javaImgUrl = 'http://develop.we-service.cn/hdd/image/'

// create an axios instance
const service = axios.create({
	baseURL: javaUrl, // api的base_url
	timeout: 5000, // request timeout
	transformRequest: [function (data) {
		// Do whatever you want to transform the data
		let ret = ''
		for (let it in data) {
			ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
		}
		return ret
	}],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// request interceptor
service.interceptors.request.use(config => {
	config.headers['Authorization'] = localStorage.getItem('token')
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
	response => {
		if (response.data.code == 10016) {
			localStorage.clear()
			window.location.href = '/#/login'
			return Promise.reject('error')
		}
		return response
	},
	error => {
		console.log('err' + error)// for debug
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	})

export default service
