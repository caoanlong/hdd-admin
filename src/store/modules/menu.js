import routersData from '../../assets/data/routers.json'

const menu = {
	state: {
		menus: []
	},
	mutations: {
		SAVE_ALLMENU: (state, menus) => {
			state.menus = menus
		},
		ADD_MENU: (state, menu) => {
			if (!menu.meta.parent || menu.meta.parent == null || menu.meta.parent == 'null') {
				state.menus.push(menu)
				return
			}
			let findRecursion = (data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].name === menu.meta.parent) {
						if (!data[i].children || data[i].children == null || data[i].children == 'null') {
							data[i].children = []
							data[i].children.push(menu)
							return
						}
						data[i].children.push(menu)
					}
					if (data[i].children) {
						findRecursion(data[i].children)
					}
				}
			}
			findRecursion(state.menus)
		},
		EDIT_MENU: (state, menu) => {
			let findRecursion = (data) => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].name === menu.name) {
						data[i] = menu
						return
					}
					if (data[i].children) {
						findRecursion(data[i].children)
					}
				}
			}
			findRecursion(state.menus)
		},
		DELETE_MENU: (state, menu) => {
			let findRecursion = (data) => {
				console.log(data)
				for (const [i, m] of data.entries()) {
					if (m.name === menu.name) {
						data.splice(i, 1)
						// delete data[i]
						return
					}
					if (m.children) {
						findRecursion(m.children)
					}
				}
			}
			findRecursion(state.menus)
		}
	},
	actions: {
		saveAllmenu ({commit}) {
			let menus = localStorage.getItem('routersData')
			commit('SAVE_ALLMENU', JSON.parse(menus))
			if (menus) {
				return
			}
			localStorage.setItem('routersData', JSON.stringify(routersData))
		},
		addMenu ({commit}, menu) {
			commit('ADD_MENU', menu)
		},
		editMenu ({commit}, menu) {
			commit('EDIT_MENU', menu)
		},
		deleteMenu ({commit}, menu) {
			commit('DELETE_MENU', menu)
		}
	}
}

export default menu