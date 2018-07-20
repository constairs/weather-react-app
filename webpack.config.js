const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  mode: 'development',
  // mode: 'production',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
					'style-loader',
					// MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]  
      }
    ]
  },
  plugins: [
		new CleanWebpackPlugin('dist', {}),
    new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: false,
			hash: true
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[hash].css',
		}),
		new WebpackMd5Hash(),
		new webpack.HotModuleReplacementPlugin()
  ]
}