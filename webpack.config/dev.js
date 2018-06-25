const basic = require('./basic')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const projectRoot = path.resolve(__dirname, '../')
function dev(basic) {
    basic.mode = 'development'
    basic.output.filename = 'bundle.js'
    basic.module.rules.push({
        test: /\.(less|css)$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                // options: { modules: true }
            },
            // 'less-loader',
            // { loader: 'less-loader', options: { javascriptEnabled: true } }
            'postcss-loader'
        ]
    })
    basic.plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${projectRoot}/index.html`,
            inject: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
    basic.devServer = {
        contentBase: './dist', // static server
        inline: true,
        hot: true,
        host: "localhost"//"172.16.1.178" //"192.168.1.5",// , //  //"localhost" //
    }
    /*basic.devServer.proxy = {
        '/': {
            target: 'http://172.16.1.25/',
            changeOrigin: true
        }
    }*/
    return basic
}

module.exports = dev(basic)
