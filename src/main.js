import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
	faBars, faPlay, faBookReader, faArrowCircleRight, 
	faChevronDown, faChevronUp, faChevronLeft, 
	faChevronRight, faList, faCircle ,
	faHeart, faAngry, faQuoteLeft, faQuoteRight, 
	faEdit, faSave, faTrash, faDownload, faTrashAlt, faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
	faAngleRight
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
