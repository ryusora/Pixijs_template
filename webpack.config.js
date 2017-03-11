var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HashPlugin = require('hash-webpack-plugin');

var enviroment = process.env.NODE_ENV || 'development'
console.log(process.env.NODE_ENV);

module.exports = {
   entry: './js/main.js',
   output: {
      path: __dirname + '/publish',
      filename: '[hash].bundle.js',
   },
   devtool: 'source-map',
   module: {
      loaders: [{
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query: {
            presets: ['es2015'],
            plugins: [
               'babel-plugin-syntax-flow',
               'babel-plugin-transform-flow-strip-types',
               'transform-class-properties',
            ]
         }
      }, {
         test: /\.glsl$/,
         loader: 'webpack-glsl-loader'
      }, {
         test: /\.vert$/,
         loader: 'webpack-glsl-loader'
      }, {
         test: /\.frag$/,
         loader: 'webpack-glsl-loader'
      }]
   },
   resolve: {
      alias: {
         config: path.join(__dirname, process.env.NODE_ENV || '_development')
      }
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.template.ejs',
         inject: 'body',
      })
   ]
};

if (enviroment == 'development') {
   console.log('[Development Plugins]', 'HotModuleReplacementPlugin', 'NoEmitOnErrorsPlugin');
   module.exports.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
   )
} else {
   console.log('[Production Plugins]', 'OccurrenceOrderPlugin', 'DedupePlugin', 'UglifyJsPlugin');

   // remove source map
   delete module.exports.devtool;

   module.exports.plugins.push(
      new CopyWebpackPlugin([{
         from: 'Assets',
         to: 'Assets'
      }]),
      new HashPlugin({
         path: module.exports.output.path,
         fileName: 'hash.txt'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            unused: true,
            dead_code: true,
            warnings: true
         }
      })
   )
}