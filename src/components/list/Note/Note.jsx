import React from 'react'
import Wrap from './Wrap'
import PlaceholderCore from './PlaceholderCore'
import SearchCore from './SearchCore'

function Note({ selectedIndex, onSelect, noteCore, index, note }){
    // const isSelected = index === selectedIndex
    if(note.displayContent) {
        return (
            <Wrap note={note}>
                <SearchCore content={note.displayContent}/>
            </Wrap>
        )
    }
    if(noteCore) {
        const LazyCore = noteCore
        return (
            <Wrap note={note}>
                <LazyCore content={note.content} />
            </Wrap>
        )
    }
    return (
        <Wrap note={note}>
            <PlaceholderCore content={note.content}/>
        </Wrap>
    )
}

export default Note

// const select = () => {
//     if(isSelected) return
//     Model.reduce(state=>({ ...state, index }))
//     onSelect(note)
// }
//select={select}
