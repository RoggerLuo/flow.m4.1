import React from 'react'
import Wrap from './Wrap'
import PlaceholderCore from './PlaceholderCore'
import SearchCore from './SearchCore'
import { Model } from 'dva'
function Core({ noteCore, note }){
    if(note.displayContent) {
        return (
            <SearchCore content={note.displayContent}/>
        )
    }
    if(noteCore) {
        const LazyCore = noteCore
        return (
            <LazyCore content={note.content} />
        )
    }
    return (
        <PlaceholderCore content={note.content}/>
    )
}
function Note({ noteCore, note, clickNote }){
    const edit = () => clickNote(note)        
    const del = () => {
        let text = note.content.slice(0,60)
        text = text.replace(/\n/g, ' ') 
        text = text.replace(/\r/g, '')
        if(note.content.length > 60) {
            text += '...'
        }
        if(confirm(`确认删除笔记？\n"${text}"`)) {
            Model.dispatch({ 
                type: 'list/deleteNote', 
                id: note.itemId, 
                callback(){
                    Model.dispatch(({ type: 'list/remove', note }))                
                }
            })
        }
    }
    return (
        <Wrap onClick={edit} onDelete={del}>
            <Core noteCore={noteCore} note={note}/>
        </Wrap>
    )
}

export default Note
