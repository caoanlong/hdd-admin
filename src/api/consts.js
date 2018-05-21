import requestSys from '../common/requestSys'

// 常量列表
export function getConsts ({params}) {
	return requestSys({
		url: `/const`,
		method: 'get',
		params
	})
}

// 常量详情
export function getConst ({id}) {
	return requestSys({
		url: `/const/${id}`,
		method: 'get'
	})
}

// 常量类型
export function getConstTypes () {
	return requestSys({
		url: `/constType`,
		method: 'get'
	})
}

// 添加常量
export function addConst ({data}) {
	return requestSys({
		url: `/const`,
		method: 'put',
		data
	})
}

// 修改常量
export function updateConst ({id, data}) {
	return requestSys({
		url: `/const/${id}`,
		method: 'post',
		data
	})
}

// 删除常量
export function delConst ({id}) {
	return requestSys({
		url: `/const/${id}`,
		method: 'delete'
	})
}