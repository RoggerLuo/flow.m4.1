import dva,{ Model } from 'dva'
import model from './model'
import Panel from './PanelContainer'
// import onSearchInput from './onSearchInput'
// import getSimilarNotes from './getSimilarNotes'
// import toggle from './toggle'

// global.flow = global.flow || {}
// global.flow.search = { onSearchInput, getSimilarNotes, components, toggle }
Model.create(model)
export default Panel
export function toggle() {
    dva._store.dispatch({ type: 'searchPanel/toggle' })
}