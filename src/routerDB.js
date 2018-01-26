import routersData from '../src/assets/data/routers.json'

export let routerDB = JSON.parse(localStorage.getItem('routersData'))

function findRecursion (routers, callback) {
	for (let i = 0; i < routers.length; i++) {
		callback && callback(routers[i])
		if (routers[i].children) {
			findRecursion(routers[i].children, callback)
		}
	}
}

export let saveRouterDB = (function () {
	localStorage.setItem('routersData', JSON.stringify(routersData))
})()

// 查找所有
export let findAll = () => routerDB

// 通过name查找
export let findByname = (name) => {
	findRecursion(routerDB, router => {
		if (router == name) {
			return router
		}
	})
}

// 新建一条
export let createData = (data) => {
	if (!data.meta.parent || data.meta.parent == null || data.meta.parent == 'null') {
		routers.push(data)
		return
	}
	findRecursion(routerDB, router => {
		if (router.name == data.meta.parent) {
			if (!router.children || router.children == null || router.children == 'null') {
				router.children = []
				router.children.push(data)
				return
			}
			routers.children.push(data)
			return
		}
	})
}

// 更新一条
export let updateData = (name, updatePer) => {
	findRecursion(routerDB, router => {
		if (router.name == name) {
			for (let attr in updatePer) {
				router[attr] = updatePer[attr]
			}
			localStorage.setItem('routersData', JSON.stringify(routerDB))
			return
		}
	})
}

// 删除一条
export let deleteData = (name) => {
	// findRecursion(routerDB, router => {
	// 	if (router.name == name) {
	// 		delete router.name
	// 		return
	// 	}
	// })
	let findRecursion = (routers) => {
		for (let i = 0; i < routers.length; i++) {
			if (routers[i].name == name) {
				delete routers[i]
				localStorage.setItem('routersData', JSON.stringify(routers))
				return
			}
			if (routers[i].children) {
				findRecursion(routers[i].children)
			}
		}
	}
	findRecursion(routerDB)
}