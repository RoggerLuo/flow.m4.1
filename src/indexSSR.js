import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import dva,{ Model, Fetch } from 'dva'
import App from './App'
import './global.css'
import model from './model'

const fetch = Fetch({ baseUrl: `http://47.75.9.249:5555` })
dva.start({ sagaInjection: { fetch } })

Model.create(model)

const ssrRender = function(){
    const app = renderToString(
        <Provider store={dva._store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
    const state = Model.get()    
    return { app, state }
}
global.ssrRender = ssrRender
export default ssrRender