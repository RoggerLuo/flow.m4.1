import React from 'react'
import { connect, Model } from 'dva'
import View from './View'
import Stateful from './Stateful'
import { set, get } from './localStorage'
import History from './History'
function Panel({ visibility, dispatch, children, text, onSearch }) {
    const search = (value) => {
        if(value == '') return 
        const queryStr = value.toLowerCase() 
        dispatch({ type: 'searchPanel/search', queryStr, onSearch })
        Model.change('searchPanel','text','')
        set(value)
    }
    const toggle = () => dispatch({ type: 'searchPanel/toggle' })
    return (
        <Stateful>
            <View visibility={visibility} search={search} text={text}>
                <History />   
            </View>
        </Stateful>
    )
}
function mapStateToProps(state) {
    return { 
        visibility: state.searchPanel.visibility,
        text: state.searchPanel.text
    }
}
export default connect(mapStateToProps)(Panel)
