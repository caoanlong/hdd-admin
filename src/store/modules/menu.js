import {addMenu, getMenus, updateMenu, delMenu} from '../../api/menu'

import reloadVueObj from '../../main'


const menu = {
	state: {
		menus: JSON.parse(sessionStorage.getItem('menus'))
	},
	mutations: {
		SAVE_ALLMENU: (state, menus) => {
			state.menus = menus
		},
		ADD_MENU: (state, menu) => {
			addMenu(menu).then(res => {
				console.log(res.data)
				reloadVueObj()
			})
		},
		EDIT_MENU: (state, menu) => {
			updateMenu(menu).then(res => {
				console.log(res.data)
				reloadVueObj()
			})
		},
		DELETE_MENU: (state, menu) => {
			delMenu({Menu_ID: menu.Menu_ID}).then(res => {
				console.log(res.data)
				reloadVueObj()
			})
		}
	},
	actions: {
		saveAllmenu ({commit}, menus) {
			commit('SAVE_ALLMENU', menus)
		},
		addMenu ({commit, state}, menu) {
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