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
                        [
                            "env",
                            {
                                "targets": {
                                    "browsers": "> 5%"
                                }
                            }
                        ],
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