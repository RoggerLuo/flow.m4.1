import React from 'react'
import { connect } from 'dva'
import SearchInput from './SearchInput'
import PanelView from './PanelView'
import { Model } from 'dva'
function Panel({ visibility, dispatch, children, interfaces, text }) {
    const search = (value) => {
        const queryStr = value 
        const onSearchResult = (res) => {
            interfaces.listOnSearch(res) //显示在首屏
        }
        dispatch({ type: 'searchPanel/search', queryStr, onSearchResult })
        Model.change('searchPanel','text','')
    }
    const toggle = () => dispatch({ type: 'searchPanel/toggle' })
    return (
        <PanelView visibility={visibility} interfaces={interfaces} search={search} text={text}>
            { children }            
        </PanelView>
    )
}
function mapStateToProps(state) {
    return { 
        visibility: state.searchPanel.visibility,
        text: state.searchPanel.text
    }
}
export default connect(mapStateToProps)(Panel)
