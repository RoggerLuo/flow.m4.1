import invariant from 'invariant'
import countWeight from './countWeight.js'
import highlight from './highlight.js'
import flatListAndWeight from './flatListAndWeight.js'

export default {
    namespace: 'list',
    state: {
        notes: [],
        originalList: [],
        index: 0,
        noteCore: null
    },
    reducers: {
        search(state,{ wordList }){
            wordList = flatListAndWeight(wordList)
            const displayList = []
            state.originalList.forEach(_note=>{
                const note = countWeight(_note,wordList)
                if(note.weight>0) {
                    displayList.push(note)    
                }
            })
            displayList.sort((a,b)=>b.weight - a.weight)
            const searchList = displayList.slice(0,20).map(note => highlight(note,wordList))
            return { ...state, notes: searchList }
        },
        fetch(state,{ notes }) {
            return { ...state, notes, originalList: notes }
        },
        add(state,{ note }) {
            let ind
            if(
                state.notes.some((_note,i)=>{
                    if(_note.itemId == note.itemId) {
                        ind = i
                        _note.content = note.content
                        return true                        
                    }
                })
            ){
                const notes = [...state.notes]
                notes[ind] = note
                return { ...state, notes }
            }
            const notes = [note,...state.notes]
            return { ...state, notes, index: 0 }
        },
        modify(state,{ note }) {
            const notes = [...state.notes]
            notes.some(_note=>{
                if(_note.itemId == note.itemId) {
                    _note.content = note.content
                    return true
                }
            })
            return { ...state, notes }
        },
        remove(state,{ itemId, callback }) {
            let index = 0
            state.notes.some((_note,_ind)=>{
                if(_note.itemId == itemId) {
                    index = _ind
                    return true
                }
            })
            const notes = [...state.notes]
            notes.splice(index,1)
            if(notes[state.index]) {
                callback && callback(notes[state.index])
            } else {
                if(notes[state.index - 1]) {
                    callback && callback(notes[state.index - 1])
                }
            }
            if(!notes[state.index]) {
                return { ...state, notes, index: state.index - 1 }
            }
            return { ...state, notes }
        }
    },
    effects: {
        * fetchNotes({ cb }, { fetch, call, put }) {
            const rawNotes = yield call(fetch, `notes`)
            const notes = rawNotes.map(entry => {
                const itemId = entry[1]
                const content = entry[2]
                const wordList = entry[3]
                const modifiedTime = entry[4]
                return { itemId, content, wordList, modifiedTime }
            })
            if (notes.length > 0) {
                const note = notes[0]
                invariant(note.hasOwnProperty('itemId') && note.hasOwnProperty('content') && note.hasOwnProperty('wordList'), 'notes格式不对')
            }
            yield put({ type: 'fetch', notes })
            cb && cb(notes)
        },
        * deleteNote({ id }, { fetch, call, put }) {
            yield call(fetch, `note/${id}`, { method: 'delete' })
        }
    },
    event: {
        onReady(dispatch) {}
    }
}
