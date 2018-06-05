import invariant from 'invariant'
import injectModel from './injectModel'

export default function(app,config,sagaMiddleware){ // options
    return { 
        get(namespace){
            return app._store.getState()[namespace]
        },
        create: injectModel(sagaMiddleware,app._store,config),
        change,
        reduce,
        dispatch: app._store.dispatch
    }
    function change(namespace,key,value){
        invariant(namespace && key,'Model change方法需要传入namespace，key')
        invariant(value !== undefined,'Model change方法需要传入value')
        app._store.dispatch({ type: `${namespace}/change`, key, value })
    }
    function reduce(namespace,reducer){
        invariant(namespace && reducer,'Model reduce方法需要传入namespace，reducer')
        app._store.dispatch({ type: `${namespace}/std`, reducer })
    }
}
