import React from 'react'
import s from './style'
import './global.css'
import List,{ fetchData, listAdd, listModify, listRemove } from 'components/list'
import Editor from 'components/editor'
import Add from 'components/Add'
import SearchPanel,{ toggle } from 'components/searchPanel'

import {Deliver} from 'dva'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.interfaces = {}
        this.onSelect = (selectedNote) => {
            this.interfaces.replace(selectedNote)
        }
    }
    componentDidMount(){
        fetchData()
        // (notes)=>{
        //     if (notes[0]) {
        //         this.interfaces.replace(notes[0])
        //     }
        // })
    }
    render(){
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{flex:'1',display:'flex'}} >
                    <div className={s.scrollbar}>
                        <List onSelect={this.onSelect}/>
                    </div>
                    <div style={{height:'100%',width:'50%',display:'none'}}>
                        
                    </div>
                </div>
                <Add click={toggle}/>
                <SearchPanel>
                    <Editor deliver={ Deliver(this.interfaces) }/>
                </SearchPanel>
            </div>
        )
    }
}
export default App
    
// this.replaceHandler = (replacer) => {
//     bridge.replacer = replacer
// }
// this.bridge = bridge
// this.onNewNote = listAdd
// this.onSaveNote = listModify
// this.onDelete = listRemove
// replaceHandler={this.replaceHandler} 
// onNewNote={this.onNewNote} 
// onSaveNote={this.onSaveNote}
// onDelete={this.onDelete}

//style={{width:'100%',height:'100%',overflowY:'scroll'}}