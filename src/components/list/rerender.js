import invariant from 'invariant'
import { Model, Xss } from 'dva'
import highlight from './highlight'
import countWeight from './countWeight'

export default function (notes,res) { //rerender
    loadList(res)
    blur()
    clearNotes()

    const wordList = setWeightOfWords(res)
    core(notes,wordList)
}

function core(notes,wordList){
    let note = notes.shift()
    if(note) {
        note = countWeight(note,wordList)
        note = highlight(note,wordList)
        pushX(note)
        setTimeout(function(){
            core(notes,wordList)
        })        
    }
}

function pushX(note) {
    invariant(note.content && note.itemId,'pushX: note缺少属性')
    if(note.weight != 0) {
        invariant(!!note.weight,'pushX: note缺少weight属性')
    }
    Model.reduce('listSearch',(state)=>{
        const notes = [...state.notes]
        state.notes.some((noteInList,ind)=>{
            if(noteInList.weight <= note.weight) {
                notes.splice(ind,0,note)
                return true
            }
        })
        if(state.notes.length == 0) {
            if(note.weight > 0) {
                notes.push(note)
            }
        }
        return { ...state, notes }
    })
}

function setWeightOfWords(res) {
    const wordList = []
    res.forEach(el => {
        el.forEach((wordEntry,ind) => {
            if(wordList.indexOf(wordEntry.word) === -1){ // 去重
                wordList.push({ word: wordEntry.word, weight: Math.pow((16-ind),3) })    
            }
        })
    })
    return wordList
}

function loadList(wordList) {
    Model.reduce('listSearch',(state)=>{
        return { ...state, wordList }
    })
}

function blur(notes) {
    Model.reduce('listSearch',(state)=>{
        return { ...state, index: null }
    })
}
function clearNotes() {
    Model.reduce('listSearch',(state)=>{
        return { ...state, notes: [] }
    })
}
