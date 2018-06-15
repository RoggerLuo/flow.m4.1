import React from 'react'
import { connect, Model } from 'dva'

function LazyComponent({ Component, interfaces, visibility, onSave, closeEditor }){
    if(!Component) {
        return (<div></div>)
    }

    let editorStyle = { height: '100%', width:'100%', position:'fixed', top:0, bottom:0, left:0, right:0, zIndex: 2, backgroundColor:'white' }
    if(!visibility) {
        editorStyle = { ...editorStyle, visibility: 'hidden' }
    }

    return (
        <div id="eidtor-container" style={editorStyle} onClick={interfaces.editorFocus}>

            <Component onSave={onSave} interfaces={interfaces} closeEditor={closeEditor} />
            
            <div style={{zIndex:3,display:'flex',textAlign: 'center',lineHeight: '44px',position:'fixed',bottom:'15px',left:'15px',right:'15px'}}>
                <div onClick={closeEditor} style={{ flex: '1',backgroundColor: '#f3f3f3' }}>取消</div>
                <div onClick={interfaces.editorSave} style={{ flex: 1, backgroundColor: 'rgb(16, 142, 233)', color: 'white' }}>保存</div>
            </div>
        </div>
    )
}
function mapToStore(state){
    return { 
        Component: state.editor.component
    }
}
export default connect(mapToStore)(LazyComponent)
