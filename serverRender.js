var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');
var ReactDOMServer = require('react-dom/server');
var React = require('react')

// const App = require('./src/App.jsx')
// const ReactApp = function(){
//     return (<div>测试服务端渲染</div>)
// }


// let string = ReactDOMServer.renderToString(<App/>)
// console.log(string)



const webpack = require('webpack'); //to access webpack runtime
const configuration = require('./webpack.config/ssr.js');

let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function(err, stats) {
    // console.log(stats)

});