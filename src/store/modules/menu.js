// import routersData from '../../assets/data/routers.json'
import {addMenu, getMenus, updateMenu, delMenu} from '../../api/menu'
import {_initRouter_} from '../../router'
import reloadVueObj from '../../main'
const menu = {
	state: {
		menus: JSON.parse(localStorage.getItem('menus'))
	},
	mutations: {
		SAVE_ALLMENU: (state, menus) => {
			state.menus = menus
		},
		ADD_MENU: (state, menu) => {
			addMenu(menu).then(res => {
				reloadVueObj()
			})
		},
		EDIT_MENU: (state, menu) => {
			updateMenu(menu).then(res => {
				reloadVueObj()
			})
		},
		DELETE_MENU: (state, menu) => {
			delMenu({id: menu._id}).then(res => {
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