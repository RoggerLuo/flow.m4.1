import invariant from 'invariant'
import countWeight from './countWeight.js'
import highlight from './highlight.js'
import flatListAndWeight from './flatListAndWeight.js'
import { Toast } from 'antd-mobile'
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
            // const notes = wordList
            //     .map(e => e.note)
            //     .map(entry => {
            //         const itemId = entry[1]
            //         const content = entry[2]
            //         const wordList = entry[3]
            //         const modifiedTime = entry[4]
            //         return { itemId, content, wordList, modifiedTime }
            //     })
            wordList = flatListAndWeight(wordList)
            const displayList = []
            state.originalList.forEach(_note=>{
                const note = countWeight(_note,wordList)
                if(note.weight>0) {
                    displayList.push(note)    
                }
            })
            displayList.sort((a,b)=>b.weight - a.weight)
            const searchList = displayList.slice(0,30).map(note => highlight(note,wordList))
            return { ...state, notes: searchList }
        },
        fetch(state,{ notes }) {
            return { ...state, notes, originalList: notes }
        },
        add(state,{ note }) {
            const returnState = { ...state }
            // 编辑
            const findIndex_original = findIndex(state.originalList,note)
            if(findIndex_original==0 || findIndex_original){ //如果是已存在的笔记
               const originalList = replaceNote(state.originalList,note)
               returnState.originalList = originalList
            }
            const foundIndex = findIndex(state.notes,note)
            if(foundIndex==0 || foundIndex){ //如果是已存在的笔记
                const notes = replaceNote(state.notes,note)
                returnState.notes = notes
            }
            if(
                (findIndex_original==0 || findIndex_original)||
                (foundIndex==0 || foundIndex)
            ) {
                return returnState                
            }
            // 新建笔记
            note.wordList = JSON.stringify([]) // 要加入wordList属性，不然会报错
            const notes = [note,...state.notes]
            const originalList = [note,...state.originalList]
            return { ...state, notes, index: 0, originalList }
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
        remove(state,{ note }) {
            const returnState = { ...state }

            const index = findIndex(state.notes,note)
            returnState.notes = [...state.notes]
            returnState.notes.splice(index,1)
            
            const index2 = findIndex(state.originalList,note)
            returnState.originalList = [...state.originalList]
            returnState.originalList.splice(index2,1)

            return returnState
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
        * deleteNote({ id , callback }, { fetch, call, put }) {
            const res = yield call(fetch, `note/${id}`, { method: 'delete' })
            if (res != 'ok') {
                Toast.offline(`删除失败: ${res}`,2,null,false)
                return
            }else{
                Toast.info('删除成功',1,null,false)
                callback && callback() 
            }
        }
    },
    event: {
        onReady(dispatch) {}
    }
}
function replaceNote(notes,note){
    const ind = findIndex(notes,note)
    if(ind==0 || ind) {
        const _notes = [...notes]
        _notes[ind] = note
        return _notes
    }
    return notes
}
function findIndex(notes,note){
    let index = null
    notes.some((_note,_ind)=>{
        if(_note.itemId == note.itemId) {
            index = _ind
            return true
        }
    })
    return index
}