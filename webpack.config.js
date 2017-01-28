var path = require('path');
var webpack = require('webpack');
var enviroment = process.env.NODE_ENV || '_development'
console.log(process.env.NODE_ENV);

module.exports =
{
   entry: './js/main.js',
   output:
   {
      path: __dirname,
      filename: 'publish/bundle.js',
   },
   devtool: 'source-map',
   module:
   {
      loaders:
      [{
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
         query:
         {
            presets: [ 'es2015' ],
            plugins:
            [
               'babel-plugin-syntax-flow',
               'babel-plugin-transform-flow-strip-types',
               'transform-class-properties',
               'transform-runtime',
            ]
         }
     }]
   },
   resolve:
   {
      alias:
      {
         config: path.join(__dirname, process.env.NODE_ENV || '_development')
      }
   },
   plugins: []
};

if (enviroment == '_development')
{
   console.log('[Development Plugins]', 'HotModuleReplacementPlugin', 'NoErrorsPlugin');
   module.exports.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
   )
}
// else
// {
//    console.log('[Production Plugins]', 'OccurrenceOrderPlugin', 'DedupePlugin', 'UglifyJsPlugin');
//    module.exports.plugins.push(
//       new webpack.optimize.OccurrenceOrderPlugin(),
//       new webpack.optimize.DedupePlugin(),
//       new webpack.optimize.UglifyJsPlugin(
//       {
//          compress :
//          {
//             unused    : true,
//             dead_code : true,
//             warnings  : true
//          }
//       })
//    )
// }

