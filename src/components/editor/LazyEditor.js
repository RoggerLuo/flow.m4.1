import React from 'react'
import { connect } from 'dva'

function LazyEditor({ Editor, tube, onSave }){
    if(!Editor) {
        return (<div></div>)
    }
    return (<Editor onSave={onSave} tube={tube}/>)
}
function mapToStore(state){
    return { 
        Editor: state.editor.component
    }
}
export default connect(mapToStore)(LazyEditor)
