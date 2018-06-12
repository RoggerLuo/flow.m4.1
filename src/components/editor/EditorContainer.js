import React from 'react'
import { connect } from 'dva'
import img from './bg.png'
import { Button } from 'antd-mobile'
// this.params = { editorState, onChange, handleKeyCommand, setRef }  
function Container({ children, focus, unsaved, cancel, save }) {
    let style = { fontSize:'17px', cursor:'text', height:'100%',backgroundColor:'white' }
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
    }
    return (
        <div style={style} onClick={focus}>
            <div style={{ padding: '15px'}}>
                {children}
            </div>
            <div style={{display:'flex',textAlign: 'center',lineHeight: '44px',position:'fixed',bottom:'15px',left:'15px',right:'15px'}}>
                <div onClick={cancel} style={{flex: '1',backgroundColor: 'gold'}}>取消</div>
                <div onClick={save} style={{flex: 1,backgroundColor: 'rgb(16, 142, 233)',color: 'white'}}>保存</div>
            </div>
        </div>
    )
}
//, height: '400px', overflowY: 'auto' 
function mapStateToProps(state) {
    return { 
        unsaved: state.editor.unsaved
    }
}

export default connect(mapStateToProps)(Container)
