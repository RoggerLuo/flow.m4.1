import React from 'react'
import { startFromScratch, startFromText } from 'components/draftEditor'
import { Editor } from 'draft-js'
import { EditorState, ContentState } from 'draft-js'

import img from './bg.png'
import moveSelectionToEnd from './moveSelectionToEnd'
// import Container from './EditorContainer'
// import Editor from './EditorUnderlying'
// import getActions from './actions'
import { Model } from 'dva'
/*
    this.props.interfaces.editorFocus
    this.props.interfaces.save
    this.props.onChange
*/
class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        const self = this
        this.state = { editorState: startFromScratch(), itemId: Date.parse(new Date())/1000, inputDOM: null }
        this.setRef = ref => this.setState({ inputDOM: ref })
        this.oldText = ''
        // this.replace = this.replace.bind(this)
        this.onChange = this.onChange.bind(this)
        
        this.focus = this.focus.bind(this)
        this.props.interfaces.editorFocus = this.focus

        this.save = this.save.bind(this)
        this.props.interfaces.save = this.save

        this.replace = this.replace.bind(this)
        this.props.interfaces.editorReplace = function(note){
            self.replace(note)   
        }

        this.newNote = this.newNote.bind(this)
        this.props.interfaces.editorNew = function(){
            self.newNote()
        } 
    }
    newNote(){
        const itemId = Date.parse(new Date())/1000
        this.replace({content:'',itemId})
        // this.setState({ editorState: startFromScratch(), itemId }, () => {
            window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        // })
    }
    replace(note,callback){
        const cs = ContentState.createFromText(note.content) 
        const editorState = EditorState.createWithContent(cs)

        // const editorState = startFromText(note.content)
        // this.oldText = editorState.getCurrentContent().getPlainText()
        
        this.setState({ editorState: moveSelectionToEnd(editorState), itemId: note.itemId },()=>{
            console.log(this.state.editorState.getCurrentContent().getPlainText())
            callback && callback()
        })
    }
    onChange(editorState) {
        const newText = editorState.getCurrentContent().getPlainText()
        this.setState({ editorState }, () => {
            if (newText !== this.oldText) {
                this.oldText = newText
                this.props.onChange && this.props.onChange({ content:newText, itemId: this.state.itemId })
                window.localStorage.setItem('_editorNote',JSON.stringify({content:newText,itemId:this.state.itemId}) )
                Model.change('editor', 'unsaved', true)
            }
        })
    }
    focus() {
        // alert(123)
        if (document.activeElement.contentEditable != 'true') {
            this.setState({ editorState: moveSelectionToEnd(this.state.editorState) }, () => {
                debugger
                this.state.inputDOM.focus()
            })
        }
    }
    save(){
        // const { itemId, editorState } = this.state
        // const note = { itemId, content: editorState.getCurrentContent().getPlainText() }
        // const unsaved = Model.get('editor').unsaved
        // Model.dispatch({ type: 'editor/save', unsaved, itemId, editorState })
        // this.newNote()
        const itemId = Date.parse(new Date())/1000
        this.setState({ editorState: startFromScratch(), itemId }, () => {
            window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        })

    }
    
    render() {
        let style = { fontSize:'17px', cursor:'text', height:'100%' }
        if(this.props.unsaved){
            style = { ...style, backgroundImage: `url(${img})` }            
        }
        return (
            <div style={style}>
                <div style={{ padding: '15px'}}>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.onChange} 
                    ref={this.setRef} 
                    placeholder={'Do less, get more'}
                />
                </div>
            </div>
        )
    }
}
export default MyEditor

// function mapStateToProps(state) {
//     return { 
//         unsaved: state.editor.unsaved
//     }
// }

// export default connect(mapStateToProps)(MyEditor)

// export default MyEditor
/*
<Editor 
    editorState={this.state.editorState} 
    onChange={this.actions.onChange}
    setRef={this.setRef}
/>

*/