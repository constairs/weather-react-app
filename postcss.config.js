module.exports = {
	plugins: [
		require('autoprefixer')({
			'browsers': ['> 1%', 'last 8 versions']
		}),
		require('cssnano')({
      preset: 'default',
    }),
	]
}