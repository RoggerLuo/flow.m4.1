import React from 'react'
import { connect, Model } from 'dva'

function LazyComponent({ Component, unsaved, interfaces }){
    if(!Component) {
        return (<div></div>)
    }
    return (
        <Component unsaved={unsaved} interfaces={interfaces} />
    )
}
function mapToStore(state){
    return { 
        Component: state.editor.component,
        unsaved: state.editor.unsaved
    }
}
export default connect(mapToStore)(LazyComponent)
