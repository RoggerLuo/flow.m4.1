import React from 'react'
import { startFromScratch, startFromText } from 'components/draftEditor'
import { Editor } from 'draft-js'
import img from './bg.png'
import moveSelectionToEnd from './moveSelectionToEnd'
import { Model } from 'dva'
/*
    向上传递
    this.props.interfaces.editorFocus
    this.props.interfaces.save
*/
class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorState: startFromScratch(), itemId: Date.parse(new Date())/1000, inputDOM: null }
        this.setRef = ref => this.setState({ inputDOM: ref })
        this.oldText = ''
        this.interfaces = this.props.interfaces

        this.onChange = this.onChange.bind(this)
        this.focus = this.focus.bind(this)
        this.save = this.save.bind(this)
        this.replace = this.replace.bind(this)
        this.newNote = this.newNote.bind(this)

        this.interfaces.editorSave = this.save
        this.interfaces.editorFocus = this.focus
        this.interfaces.openEditor = (startNote) => {
            if(startNote) {
                this.replace(startNote)
            }else{
                this.newNote()
            }
        }
    }
    newNote(){
        const itemId = Date.parse(new Date())/1000
        this.replace({content:'',itemId})
        this.setState({ editorState: startFromScratch(), itemId }, () => {
            window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        })
    }
    replace(note,callback){
        const editorState = startFromText(note.content)
        this.oldText = editorState.getCurrentContent().getPlainText()
        this.setState({ editorState, itemId: note.itemId })
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
        if (document.activeElement.contentEditable != 'true') {
            this.setState((prevState)=>({ editorState: moveSelectionToEnd(prevState.editorState) }), () => {
                this.state.inputDOM.focus()
            })
        }
    }
    save(){
        const { itemId, editorState } = this.state
        const note = { itemId, content: editorState.getCurrentContent().getPlainText() }
        const callback = (note) => {
            this.newNote()
            this.props.onSave && this.props.onSave(note)
            this.props.closeEditor()
        }
        Model.dispatch({ type: 'editor/save', note, callback })
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
