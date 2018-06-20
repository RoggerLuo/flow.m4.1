import invariant from 'invariant'
import React from 'react'
import { startFromScratch, startFromText } from 'components/draftEditor'
import moveSelectionToEnd from './moveSelectionToEnd'
import View from './View'
class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorState: startFromScratch(), itemId: Date.parse(new Date())/1000, dom: null }
        this.setRef = ref => this.setState({ dom: ref })
        this.props.tube.focus = this.focus.bind(this)        
        this.props.tube.reduce = this.reduce.bind(this)
        this.props.tube.getNote = this.getNote.bind(this)
    }
    reduce(reduceFunc,callbackFunc){
        const replaceFunction =(prevState)=>{
            const prevNote = {
                content: prevState.editorState.getCurrentContent().getPlainText(),
                itemId: prevState.itemId
            }
            const object = reduceFunc(prevNote)
            invariant((object.content != undefined) && object.itemId,'editor reduce需要返回一个完整的note')
            const editorState = startFromText(object.content)
            const itemId = object.itemId
            return { editorState, itemId }
        }
        this.setState(replaceFunction,callbackFunc)
    }
    getNote(){
        return {
            content: this.state.editorState.getCurrentContent().getPlainText(),
            itemId: this.state.itemId
        }
    }
    onChange(editorState) {
        const newText = editorState.getCurrentContent().getPlainText()
        this.setState({ editorState }, () => {
            this.props.onChange && this.props.onChange({ content: newText, itemId: this.state.itemId })
        })
    }
    focus() {
        if (document.activeElement.contentEditable != 'true') {
            this.setState((prevState)=>({ editorState: moveSelectionToEnd(prevState.editorState) }), () => {
                this.state.dom.focus()
            })
        }
    }
    render() {
        return (
            <View 
                editorState={this.state.editorState} 
                onChange={this.onChange.bind(this)} 
                setRef={this.setRef}
            />
        )
    }
}
export default Basic
