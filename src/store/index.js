import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import server from './server'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		apiUrl: 'http://elearning.test/api',
        home: 'http://localhost:8080/home',
	},
	modules: {
		auth,
		server
	}
})
