import React from 'react' // 8 kb
import { render } from 'react-dom' // 92kb
import { Provider } from 'react-redux' //16kb
import createSagaMiddleware from 'redux-saga' //24kb
import invariant from 'invariant' // 1kb
import "babel-polyfill" // 90kb
import { Editor } from 'draft-js' //193kb
 import { createStore, applyMiddleware } from 'redux' // 8kb


class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{flex:'1',display:'flex'}} >
                    <div style={{height:'100%',width:'50%',display:'none'}}>
                        
                    </div>
                </div>
            </div>
        )
    }
}