const basic = require('./basic')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const projectRoot = path.resolve(__dirname, '../')

function dev(basic){
    basic.mode = 'production'
    basic.output.filename = 'bundle.js'
    basic.output.publicPath = 'http://172.16.1.178:8000/'
    basic.module.rules.push({
        test: /\.css$/,
        ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader' ]
        })
    })
    basic.plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${projectRoot}/index.html`,
            inject: true
        }),
        new ExtractTextPlugin('style.css',{ allChunks: true })
    ]
    return basic   
}

const configuration = product(basic)
let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function(err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})