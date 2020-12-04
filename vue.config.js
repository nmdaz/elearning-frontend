
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/elearning-frontend/' : '/',
	configureWebpack: {
		devtool: 'source-map'
	}
}