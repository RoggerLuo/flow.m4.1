import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import dva,{Model,Fetch} from 'dva'
import App from './App'

import model from './model'

const fetch = Fetch(`http://47.75.9.249:5555`)
dva.start({ sagaInjection: { fetch } })

Model.create(model)

render(
    <Provider store={dva._store}>
        <App />
    </Provider>,
    document.getElementById('root')
)