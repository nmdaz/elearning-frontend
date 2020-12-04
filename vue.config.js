
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/elearning/' : '/',
	configureWebpack: {
		devtool: 'source-map'
	}
}