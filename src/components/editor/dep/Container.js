import React from 'react'
import { startFromScratch, startFromText } from 'components/draftEditor'
import moveSelectionToEnd from './moveSelectionToEnd'
import { Model } from 'dva'
import View from './View'
/*
    向上传递
    this.props.interfaces.editorFocus
    this.props.interfaces.save
*/
class Editor extends React.Component {
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
        this.replaceContent = this.replaceContent.bind(this)
        
        this.interfaces.replaceContent = this.replaceContent
        this.interfaces.editorSave = this.save
        this.interfaces.editorFocus = this.focus
        this.interfaces.editorLoad = this.replace
        this.interfaces.editorNew = this.newNote
    }
    newNote(){
        const itemId = Date.parse(new Date())/1000
        this.replace({content:'',itemId})
        this.setState({ editorState: startFromScratch(), itemId }, () => {
            window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        })
    }
    replaceContent(tagValue){
        let text = this.oldText
        let str
        if(text[text.length-1]=='-') {
            str = ` ${tagValue} -`
        }else{
            str = `\n- ${tagValue} -`
        }
        this.oldText += str
        const editorState = startFromText(this.oldText)
        this.setState({ editorState })
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
                // 这一句应该放在外部
                window.localStorage.setItem('_editorNote',JSON.stringify({content:newText,itemId:this.state.itemId}) )
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
    save(e){
        const { itemId, editorState } = this.state
        const note = { itemId, content: editorState.getCurrentContent().getPlainText() }
        const callback = (note) => {
            this.newNote()
            this.props.onSave && this.props.onSave(note)
            this.props.closeEditor()
        }
        Model.dispatch({ type: 'editor/save', note, callback })
        e.stopPropagation()
        e.preventDefault()
    }
    render() {
        return <View editorState={this.state.editorState} onChange={this.onChange} setRef={this.setRef}/>
    }
}
export default Editor
