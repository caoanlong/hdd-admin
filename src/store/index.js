import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		user,
		permission,
		errorLog,
		tagsView
	},
	getters
})

export default store