export default {
	state: {
		url: process.env.NODE_ENV === 'production' ? 'https://evening-river-03008.herokuapp.com' :'http://elearning.test',
		apiUrl: process.env.NODE_ENV === 'production' ? 'https://evening-river-03008.herokuapp.com/api' :'http://elearning.test/api'
	}
}