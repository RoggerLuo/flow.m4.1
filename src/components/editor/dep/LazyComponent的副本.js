import React from 'react'
import { connect, Model } from 'dva'
import Tags from 'components/history'
import LazyEditor from './LazyEditor'

function LazyComponent({ tube, visibility, onSave, closeEditor, tagsPanelVisibility }){
    let editorStyle = { width:'100%', position:'fixed', top:0, bottom:'44px', left:0, right:0, zIndex: 2, backgroundColor:'white' }
    if(!visibility) {
        editorStyle = { ...editorStyle, display: 'none' }
    }
    return (
        <div id="editor-container" style={editorStyle} onClick={()=>interfaces.editorFocus()}>
            <LazyEditor onSave={onSave} tube={tube} />
            <TagPanel />
        </div>
    )
}
function mapToStore(state){
    return { 
        tagsPanelVisibility: state.editor.tagsPanelVisibility
    }
}
export default connect(mapToStore)(LazyComponent)
