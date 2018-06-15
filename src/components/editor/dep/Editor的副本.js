import React from 'react'
import { startFromScratch, startFromText } from 'components/draftEditor'
import { Editor } from 'draft-js'
// import Container from './EditorContainer'
// import Editor from './EditorUnderlying'
import getActions from './actions'
import { Model, connect } from 'dva'
import img from './bg.png'

class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        const itemId = Date.parse(new Date()) / 1000
        this.state = { editorState: startFromScratch(), itemId, inputDOM: null }
        this.actions = getActions.bind(this)()
        this.setRef = ref => {
            this.setState({ inputDOM: ref })
            // this.props.interfaces.editorFocus = () => this.state.inputDOM.focus()
        }
        this.props.interfaces.editorFocus = this.actions.focus
        this.props.interfaces.editorReplace = this.actions.replace
        this.props.interfaces.editorNew = () => {
            const itemId = Date.parse(new Date()) / 1000
            this.setState({ editorState: startFromScratch(), itemId })
        }
        
        this.saveNote = () => {
            // const { itemId, editorState } = this.state
            // const note = { itemId, content: editorState.getCurrentContent().getPlainText() }
            // const unsaved = Model.get('editor').unsaved
            // const callback = () => {
            //     const itemId = Date.parse(new Date()) / 1000
            //     this.setState({ editorState: startFromScratch(), itemId }, () => {
            //         window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
            //     })
            // }
            // Model.dispatch({ type: 'editor/save', unsaved, itemId, editorState })
            // callback()
            // debugger
            console.log(startFromText(''))
            this.setState({ editorState: startFromText(''), itemId:Date.parse(new Date()) / 1000 })
        }
        this.props.interfaces.saveNote = this.saveNote
    }
    render() {
        console.log('render')
        console.log(this.state)
        let style = { fontSize:'17px', cursor:'text', height:'100%',backgroundColor:'white' }
        if(this.props.unsaved){
            style = { ...style, backgroundImage: `url(${img})` }            
        }
        return (
            <div style={style} onClick={this.actions.focus}>
                <div style={{ padding: '15px'}}>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.actions.onChange} 
                    ref={this.setRef} 
                    placeholder={'Do less, get more'}
                />
                </div>
                <div style={{display:'flex',textAlign: 'center',lineHeight: '44px',position:'fixed',bottom:'15px',left:'15px',right:'15px'}}>
                    <div onClick={this.props.interfaces.closeEditor} style={{flex: '1',backgroundColor: 'gold'}}>取消</div>
                    <div onClick={this.saveNote} style={{flex: 1,backgroundColor: 'rgb(16, 142, 233)',color: 'white'}}>保存</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        unsaved: state.editor.unsaved
    }
}

export default connect(mapStateToProps)(MyEditor)

// export default MyEditor
/*
<Editor 
    editorState={this.state.editorState} 
    onChange={this.actions.onChange}
    setRef={this.setRef}
/>

*/