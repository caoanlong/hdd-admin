import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store'

// 杨霞
// export const javaUrl = 'http://192.168.1.68:9898'
// 张颜
// export const javaUrl = 'http://192.168.1.29:9898'
// 农信卡
// export const javaUrl = 'http://192.168.1.49:9898'
// export const javaUrl = 'http://192.168.1.48:9898' // 测试环境
// export const javaUrl = 'http://tms.develop.we-service.cn/tms-admin-practice' // 演练环境
export const javaUrl = 'http://admin.hdd56.com/api' // 生产环境
// export const javaImgUrl = 'http://develop.we-service.cn/hdd/image/' // 测试环境
export const javaImgUrl = 'http://www.hdd56.com/hdd/image/' // 生产环境

// create an axios instance
const service = axios.create({
	baseURL: javaUrl, // api的base_url
	timeout: 5000, // request timeout
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

// request interceptor
service.interceptors.request.use(config => {
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	config.headers['Authorization'] = localStorage.getItem('token')
	if (config.data && config.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
    	config.data = qs.stringify(config.data)
	}
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

// jquery ajax
// jQuery.support.cors = true
// const ajax = function (json) {
// 	let data = null
// 	if (json.data) {
// 		data = json.data
// 	} else {
// 		data = json.params
// 	}
// 	return new Promise((resolve, reject) => {
// 		$.ajax({
// 			url: javaUrl + json.url,
// 			type: json.method || 'get',
// 			dataType: 'json',
// 			processData: false,
// 			data: !json.contentType ? qs.stringify(data) : data,
// 			headers: {
// 				'contentType': json.contentType || 'application/x-www-form-urlencoded;charset=utf-8',
// 				'Authorization': localStorage.getItem('token')
// 			},
// 			beforeSend: (res) => {
// 			},
// 			complete: (res) => {
// 				let response = res.responseJSON
// 				if (response.code == 10016) {
// 					localStorage.clear()
// 					// Message.error(response.msg)
// 					window.location.href = '/#/login'
// 					reject(res)
// 					return
// 				}
// 				let resData = {}
// 				let authorization = res.getResponseHeader('authorization')
// 				if (authorization) resData.headers = {'authorization': authorization}
// 				resData.data = response
// 				// console.log(resData)
// 				resolve(resData)
// 			},
// 			success: (res) => {
// 			},
// 			error: (res) => {
// 				Message({
// 					message: res.message,
// 					type: 'error',
// 					duration: 5 * 1000
// 				})
// 				reject(res)
// 			}
// 		})
// 	})
// }

// export default ajax
export default service
