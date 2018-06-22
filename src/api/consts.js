import request from '../common/request'

// 常量列表
export function getConsts ({params}) {
	return request({
		url: `/const`,
		method: 'get',
		params
	})
}

// 常量详情
export function getConst ({id}) {
	return request({
		url: `/const/${id}`,
		method: 'get'
	})
}

// 常量类型
export function getConstTypes () {
	return request({
		url: `/constType`,
		method: 'get'
	})
}

// 添加常量
export function addConst ({data}) {
	return request({
		url: `/const`,
		method: 'put',
		data
	})
}

// 修改常量
export function updateConst ({id, data}) {
	return request({
		url: `/const/${id}`,
		method: 'post',
		data
	})
}

// 删除常量
export function delConst ({id}) {
	return request({
		url: `/const/${id}`,
		method: 'delete'
	})
}