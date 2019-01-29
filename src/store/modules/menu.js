import {getMenus, delMenu} from '../../api/menu'
import SysMenuBoss from '../../api/SysMenuBoss'
import SysUser from '../../api/SysUser'
import { Message } from 'element-ui'

const menu = {
	state: {
		menus: sessionStorage.getItem('menus') != 'undefined' ? JSON.parse(sessionStorage.getItem('menus')) : ''
	},
	mutations: {
		GET_MENU: (state) => {
			SysUser.menuList().then(res => {
				state.menus = res
				sessionStorage.setItem('menus', JSON.stringify(res))
			})
		},
		SAVE_MENU: (state, menu, callback) => {
			SysMenuBoss.save(menu).then(response => {
				Message.success(response.data.msg)
				SysUser.menuList().then(res => {
					state.menus = res
					sessionStorage.setItem('menus', JSON.stringify(res))
				})
			})
		},
		DELETE_MENU: (state, menu, callback) => {
			SysMenuBoss.del({ menuID: menu.menuID}).then(response => {
				Message.success(response.data.msg)
				SysUser.menuList().then(res => {
					state.menus = res
					sessionStorage.setItem('menus', JSON.stringify(res))
				})
			})
		}
	},
	actions: {
		getMenu ({commit}) {
			commit('GET_MENU')
		},
		saveMenu ({commit, state}, menu) {
			commit('SAVE_MENU', menu)
		},
		deleteMenu ({commit}, menu) {
			commit('DELETE_MENU', menu)
		}
	}
}

export default menu