import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faPhp, faLaravel, faJs, faHtml5, faCss3, faVuejs, faSass, faFacebookSquare, faGithub } from '@fortawesome/free-brands-svg-icons'

import { 
	faBars, faPlay, faBookReader, faArrowCircleRight, faChevronDown, faChevronUp, faChevronLeft, 
	faChevronRight, faList, faCircle, faHeart, faAngry, faQuoteLeft, faQuoteRight, faEdit, faSave, 
	faTrash, faDownload, faTrashAlt, faAngleRight, faDatabase, faEnvelope, faUser
} from '@fortawesome/free-solid-svg-icons'

library.add (
	faBars, 
	faPlay, 
	faBookReader, 
	faArrowCircleRight, 
	faChevronDown, 
	faChevronUp, 
	faChevronLeft, 
	faChevronRight, 
	faList, 
	faCircle, 
	faHeart, 
	faAngry,
	faQuoteLeft,
	faQuoteRight,
	faEdit,
	faSave,
	faTrash,
	faDownload,
	faTrashAlt,
	faAngleRight,
	faCopyright,
	faPhp,
	faLaravel,
	faDatabase, 
	faHtml5, 
	faCss3, 
	faVuejs, 
	faSass,
	faJs,
	faEnvelope,
	faFacebookSquare,
	faGithub,
	faUser
)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

axios.defaults.headers.common.Accept = 'application/json';
window.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
