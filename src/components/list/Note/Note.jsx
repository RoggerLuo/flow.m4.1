import React from 'react'
import Wrap from './Wrap'
import Core from './Core'

function Note({ selectedIndex, onSelect, noteCore, index, note }){
    const isSelected = index === selectedIndex
    // const select = () => {
    //     if(isSelected) return
    //     Model.reduce(state=>({ ...state, index }))
    //     onSelect(note)
    // }
    //select={select}
    if(noteCore) {
        const LazyCore = noteCore
        return (
            <Wrap isSelected={isSelected} >
                <LazyCore content={note.content} />
            </Wrap>
        )
    }
    return (
        <Wrap isSelected={isSelected}>
            <Core content={note.content}/>
        </Wrap>
    )
}

export default Note

