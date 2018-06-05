const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: `${projectRoot}/src/index.js`,
    },
    output: {
        path: `${projectRoot}/dist`,
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.html'],
        alias: {
            'components': `${projectRoot}/src/components`,
            'util': `${projectRoot}/src/util`,
            'dva': `${projectRoot}/dva`
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['env','react']
                }
            },
            { 
                test: /\.html$/, 
                use: [ 'html-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
            }
        ]
    },
    context: path.join(__dirname, '')
}

