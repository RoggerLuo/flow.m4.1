import React from 'react'
import dva,{connect} from 'dva'
import Note from './NoteContainer'

function Notes({ dispatch, currentIndex, onSelect, notes }){
    const params = { dispatch, currentIndex, onSelect }
    return (
        <div style={{width:'100%'}}>
            { notes.map((note,index) => <Note {...params} index={index} note={note} key={index}/>) }
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        notes: state.list.notes,
        currentIndex: state.list.index
    }
}

export default connect(mapStateToProps)(Notes)
