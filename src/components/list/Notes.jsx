import React from 'react'
import { connect } from 'dva'
import Note from './Note/Note'

function Notes({ onSelect, notes, selectedIndex, noteCore }){
    const publicParams = { selectedIndex, onSelect, noteCore }
    return (
        <div style={{width:'100%',backgroundColor:'white'}}>
            { notes.slice(0,30).map((note,index) => <Note {...publicParams} index={index} note={note} key={index}/>) }
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
