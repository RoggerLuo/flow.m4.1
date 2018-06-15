import dva,{ Model } from 'dva'
import model from './model'
import Panel from './Container'

Model.create(model)

export default Panel

export function close() {
    Model.change('searchPanel','visibility',false)
}
export function open() {
    Model.change('searchPanel','visibility',true)
    Model.get('searchPanel').ref.focus()
}
export function toggle() {
    dva._store.dispatch({ type: 'searchPanel/toggle' })
}