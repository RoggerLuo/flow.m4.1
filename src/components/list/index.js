import dva,{ Model } from 'dva'
import model from './model'
import component from './Notes'
import importDraftjsCore from './lazyCore'

Model.create(model)

export default component
export { importDraftjsCore }
export function closeSearchList(){
    Model.reduce('list',(state)=>{
        return { ...state, notes: state.originalList }
    })
}
export function renderSearchList(res){
    Model.dispatch({ type: 'list/search', wordList: res })
}
export function fetchData(cb) {
    dva._store.dispatch({ type: 'list/fetchNotes', cb })
}
export function add(note) {
    dva._store.dispatch({ type: 'list/add', note })
}
export function remove(itemId,callback) {
    dva._store.dispatch({ type: 'list/remove', itemId, callback })
}