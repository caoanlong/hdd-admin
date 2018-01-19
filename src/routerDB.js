import routersData from '../src/assets/data/routers.json'

const routerDB = JSON.parse(localStorage.getItem('routersData'))

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

export let findAll = () => routerDB

export let findByname = (name) => {
	findRecursion(routerDB, router => {
		if (router == name) {
			return router
		}
	})
}
export let createData = (data) => {
	if (!data.parent || data.parent == null || data.parent == 'null') {
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
export let updateData = (name, updatePer) => {
	findRecursion(routerDB, router => {
		if (router.name == name) {
			for (let attr in updatePer) {
				router[attr] = updatePer[attr]
			}
			return
		}
	})
}
export let deleteData = (name) => {
	findRecursion(routerDB, router => {
		if (router.name == name) {
			return router
		}
	})
}