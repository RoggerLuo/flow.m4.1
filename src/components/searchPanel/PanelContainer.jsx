import React from 'react'
import { connect } from 'dva'
import SearchInput from './SearchInput'
import PanelView from './PanelView'
import { Model } from 'dva'
function Panel({ text, visibility, dispatch, onSearchResult, children }) {
    if(!visibility) return null
    const search = () => {
        const queryStr = Model.get('searchPanel').text
        dispatch({ type: 'searchPanel/search', queryStr, onSearchResult })
        Model.change('searchPanel','text','')
    }
    
    // const onChange = (e) => {
    //     dispatch({ type:'searchPanel/onChange', text: e.target.value })
    // }
    const toggle = () => dispatch({ type: 'searchPanel/toggle' })

    const handlers = {}
    // const delivery = _handlers => {
    //     // Object.keys(_handlers).forEach(key=>handlers[key] = _handlers[key])
    //     _handlers.keybind(function({ keyMap, meta, ctrl },catcher){
    //         catcher(keyMap['enter'],{},(e)=>{
    //             search()
    //             toggle()
    //         })
    //         catcher(keyMap['f'],{meta},toggle)
    //     })
    // }
    return (
        <PanelView>
            { children }            
        </PanelView>
    )
}
//<SearchInput delivery={delivery} onChange={onChange} text={text}/>
function mapStateToProps(state) {
    return { 
        visibility: state.searchPanel.visibility,
        text: state.searchPanel.text
    }
}

export default connect(mapStateToProps)(Panel)
