var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var enviroment = process.env.NODE_ENV || 'development';
var mode = (enviroment == 'production')?enviroment:'development';
console.log(process.env.NODE_ENV, mode);

const m_export =
{
    entry: './js/main.js',
    mode: mode,
    output:
    {
        path: __dirname + '/publish',
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    module:
    {
        rules:
        [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query:
            {
            presets: [ 'es2015', 'stage-0' ],
            plugins:
            [
                'babel-plugin-syntax-flow',
                'babel-plugin-transform-flow-strip-types',
                'transform-class-properties',
            ]
            }
        }]
    },
    resolve: {
        alias: {
            config$: path.join(__dirname + '/fb-instant/', (process.env.NODE_ENV || '_development') + '.js')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.template.ejs',
            inject: 'body',
        })
    ]
};
console.log(m_export.resolve.alias.config);
if (mode == 'development')
{
   console.log('[Development Plugins]', 'HotModuleReplacementPlugin');
   m_export.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
   )
}
else
{
   console.log('[Production Plugins]', 'OccurrenceOrderPlugin', 'DedupePlugin', 'UglifyJsPlugin');

   // remove source map
   delete m_export.devtool;
}

module.exports = m_export;