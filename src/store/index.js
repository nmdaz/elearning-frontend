import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import server from './server'

Vue.use(Vuex)

export default new Vuex.Store({
	state: { navbar: null },
	modules: {
		auth,
		server
	}
})
