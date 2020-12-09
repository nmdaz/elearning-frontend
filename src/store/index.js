import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import server from './server'

Vue.use(Vuex)

export default new Vuex.Store({
	state: { 
		navbar: null 
	},
	getters: {
		availableScreenHeight(state) {
			if (state.navbar) return window.outerHeight;
			let navbar = state.navbar;
			let navbarHeight = navbar.$el.offsetHeight;
			let windowHeight = window.outerHeight;
			let availableHeight = windowHeight - navbarHeight;
			return availableHeight;
		}
	},
	modules: {
		auth,
		server
	}
})
