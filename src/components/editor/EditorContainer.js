import React from 'react'
import { connect } from 'dva'
import img from './bg.png'

// this.params = { editorState, onChange, handleKeyCommand, setRef }  
function Container({ children, focus, unsaved }) {
    let style = { fontSize:'17px', cursor:'text', height:'100%' }
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
    }
    return (
        <div style={style} onClick={focus}>
            <div style={{ padding: '10px' }}>
                {children}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        unsaved: state.editor.unsaved
    }
}

export default connect(mapStateToProps)(Container)
