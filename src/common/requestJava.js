import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

export const javaUrl = process.env.BASE_JAVA_API

// create an axios instance
const service = axios.create({
	baseURL: javaUrl, // api的base_url
	timeout: 30000, // request timeout
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
		if (response.data.code != 200) {
			if (response.data.code == 10016) {
				localStorage.clear()
				if (response.data.msg) {
					Message.error(response.data.msg)
				} else {
					Message.error(response.data.message)
				}
				window.location.href = '/#/login'
				return Promise.reject('error')
			}
			if (response.data.msg) {
				Message.error(response.data.msg)
			} else {
				Message.error(response.data.message)
			}
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
	}
)

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
