import "babel-polyfill"
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connect } from 'react-redux'
import invariant from 'invariant'
import Keyboard from './Keyboard'
import modelMethod from './Model'
import constantMethod from './Constant'
import Fetch from './Fetch'
import Xss from './Xss'
import Deliver from './Deliver'

const app = {
    _store: null,
    _constants: {},
    // _model: {},
    start
} 
let alreadyStarted = false
const config = { sagaInjection: {}}
function start(_conf){
    invariant(!alreadyStarted,'dva已经初始化过一次了')
    alreadyStarted = true
    if(!_conf) return
    invariant(typeof(_conf) ==='object','config文件应该为object')
    Object.keys(_conf).forEach(key=>{
        config[key] = _conf[key]   
    })
}
const sagaMiddleware = createSagaMiddleware()
app._store = createStore(a => a, applyMiddleware(sagaMiddleware))

// export 
export const Model = modelMethod(app,config,sagaMiddleware)
export const Constant = constantMethod(app)
export { Fetch, connect, Keyboard, Xss, Deliver } 
export default app

// const reducers = {}
// Model.create = injectModel(sagaMiddleware,reducers,app._store)
// app.model = Model.create

// export Model

// start(app)
// function start(app) {
// }

// export const Model
// import config from '../dva.config'
// app.model = injectModel(sagaMiddleware,reducers,app._store)
// app.constant = function(obj) {
//     invariant(typeof(obj) === 'object', `dva.constant method expect an object `)
//     Object.keys(obj).forEach(key => {
//         const reservedKeys = ['_models', '_store', 'model', 'saga', 'connect']
//         invariant(reservedKeys.indexOf(key) === -1, `constant name conficted with dva reserved key`)
//         app[key] = obj[key]
//     })
// }
// app.constant(config)