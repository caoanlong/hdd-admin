import request from '../common/request'

// 获取菜单
export function getMenus () {
	return new Promise((resolve, reject) => { request({
			url: '/menu',
			method: 'get'
		}).then(res => {
			resolve(res.data.data)
		})
	})
}

// 添加菜单
export function addMenu (data) {
	return request({
		url: '/menu/add',
		method: 'post',
		data
	})
}

// 修改菜单
export function updateMenu (data) {
	return request({
		url: '/menu/update',
		method: 'post',
		data
	})
}

// 删除菜单
export function delMenu (data) {
	return request({
		url: '/menu/delete',
		method: 'post',
		data
	})
}