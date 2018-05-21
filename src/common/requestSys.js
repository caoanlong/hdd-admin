import axios from 'axios'
import { Message } from 'element-ui'
console.log(process.env.BASE_SYS_API)
// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_SYS_API, // api的base_url
	timeout: 45000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
	config.headers['Authorization'] = localStorage.getItem('token')
	return config
}, error => {
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
	response => {
		if (response.data.code != 200) {
			if (response.data.code == 10016) {
				localStorage.clear()
				Message.error(response.data.msg)
				window.location.href = '/#/login'
				return Promise.reject('error')
			}
			Message.error(response.data.msg)
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

export default service
