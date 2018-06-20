import React from 'react'
import Middle from './Middle'
import { Toast } from 'antd-mobile'
class Top extends React.Component {
    constructor(props) {
        super(props)
        this.tube = { /* internal tube*/ }
        props.tube.addTagContent = (val) => this.tube.addTagContent(val)
        props.tube.save = ()=>this.tube.save()
        props.tube.focus = ()=>this.tube.focus()
        props.tube.edit = (note) => {
            if (localStorage.getItem('_editorNote')) {
                const lastNote = JSON.parse(localStorage.getItem('_editorNote'))   
                if(lastNote.content) {
                    this.tube.replace(lastNote)
                    Toast.info('上次的文章未保存', 1.5)   
                    return
                }
            }
            if(note) {
                this.tube.replace(note)                
            }else{
                this.tube.newNote()
            }
        }
    }
    render(){
        return (<Middle tube={this.tube} onSave={this.props.onSave}/>)
    }
}
export default Top