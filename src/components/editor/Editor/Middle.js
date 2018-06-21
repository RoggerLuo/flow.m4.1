import React from 'react'
import { Model } from 'dva'
import Basic from './Basic'
import { Toast } from 'antd-mobile'

class Middle extends React.Component {
    constructor(props) {
        super(props)
        this.oldText = ''
        this.tube = this.props.tube
        
        this.tube.addTagContent = this.addTagContent.bind(this)        
        this.tube.save = this.save.bind(this)        
        this.tube.replace = this.replace.bind(this)        
        this.tube.newNote = this.newNote.bind(this)
    }
    addTagContent(tagValue){
        let text = this.oldText
        let str
        if(text[text.length-1]=='-') {
            str = ` ${tagValue} -`
        }else{
            str = `\n- ${tagValue} -`
        }
        this.oldText += str
        this.tube.reduce(prevNote => ({ content: this.oldText, itemId: prevNote.itemId }))
    }
    replace(note,callback){
        this.tube.reduce(prevNote=>note,()=>{
            this.oldText = this.tube.getNote().content
        })
    }
    save(){
        const note = this.tube.getNote()
        if (localStorage.getItem('_editorNote')) { // 如果没有编辑就不要保存
            const lastNote = JSON.parse(localStorage.getItem('_editorNote'))   
            if(lastNote.content == "") {
                Toast.info('没有编辑，无需保存',1,null,false)
                this.props.onSave && this.props.onSave(note)
                return
            }
        }
        const callback = (note) => {
            this.newNote()
            this.props.onSave && this.props.onSave(note)
        }
        Model.dispatch({ type: 'editor/save', note, callback })
    }
    newNote(){
        const itemId = Date.parse(new Date())/1000
        this.tube.reduce(
            prevNote => ({ content: '', itemId }), 
            () => window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        )
    }
    onChange(note){
        const newText = note.content 
        if (newText !== this.oldText) {
            this.oldText = newText
            window.localStorage.setItem('_editorNote',JSON.stringify({ content: newText, itemId: note.itemId }) )
        }
    }
    render() {
        return <Basic onChange={this.onChange.bind(this)} tube={this.props.tube}/>
    }
}
export default Middle