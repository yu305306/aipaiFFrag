var webpack = require('webpack');


module.exports = {
	entry : './AipaiVideoDataMain.js',
	output : {
		path : __dirname,
		filename : 'AipaiHtmlVideoMain.js'
	},
	module : {
		loaders : [
			{
				test : /\.css$/,
				exclude : /(node_modules)/,
				loader : 'style-loader!css-loader'
			},
			{
				test : /.\js$/,
				exclude:/(node_modules)/,
				loader:'babel-loader?presets=es2015'
			}
		]
	}
};