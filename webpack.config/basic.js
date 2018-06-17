const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const projectRoot = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: `${projectRoot}/src/index.js`,
    },
    output: {
        path: `${projectRoot}/dist`,
        chunkFilename: '[name].bundle.js',
        filename: 'bundle.[hash].js',
        // publicPath: '/'
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
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "env", /* 如果设置"targets": {"browsers": "> 5%"}就不会转let和const，我的mac safari浏览器就会报错 */
                        "stage-3",
                        "react"
                    ],
                    plugins: [
                        "syntax-dynamic-import",
                        "transform-regenerator", ["import", { "libraryName": "antd-mobile", "style": 'css' }]
                    ]
                }
            },
            {
                test: /\.html$/,
                use: ['html-loader']
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