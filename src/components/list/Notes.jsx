import React from 'react'
import { connect } from 'dva'
import Note from './Note/Note'

function Notes({ notes, ...restParameters }){ //onSelect, , selectedIndex, noteCore, edit
    return (
        <div style={{width:'100%',backgroundColor:'white'}}>
            { notes.slice(0,30).map((note,index) => <Note {...restParameters} index={index} note={note} key={index}/>) }
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        notes: state.list.notes,
        selectedIndex: state.list.index,
        noteCore: state.list.noteCore
    }
}

export default connect(mapStateToProps)(Notes)

//const publicParams = { selectedIndex, onSelect, noteCore, edit }
