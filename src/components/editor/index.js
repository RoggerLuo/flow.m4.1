import React from 'react'
import { connect, Model } from 'dva'
import model from './model'
import LazyComponent from './LazyComponent'
import './style.css'
import(/* webpackChunkName: "Editor" */ './Editor').then(_Editor => {
    const Editor = _Editor.default
    Model.change('editor','component',Editor)
}).catch(error => 'An error occurred while loading the editor')
/* 对外界一无所知,只能用本组件的model,dispatch自己model的方法 */
Model.create(model)

export default LazyComponent
