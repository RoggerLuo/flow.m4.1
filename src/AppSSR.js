import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'

let string = ReactDOMServer.renderToString(<App/>)
// console.log(string)
const dom = document.getElementById('root')
dom.innerHTML = string