import React from 'react'
import { connect, Model } from 'dva'
import View from './View'
import Stateful from './Stateful'
import History from 'components/history'
function Panel({ visibility, children, text, onSearch, historyData }) {
    const search = (value) => {
        if(value == ' ') return 
        if(value == '') return 
        const queryStr = value.toLowerCase() 
        Model.dispatch({ type: 'searchPanel/search', queryStr, onSearch })
        Model.change('searchPanel','text','')
    }
    const toggle = () => dispatch({ type: 'searchPanel/toggle' })
    const onClick = val => {
        const str = Model.get('searchPanel').text + ' ' + val
        Model.change('searchPanel','text',str)
        search(str)
    }
    return (
        <Stateful>
            <View visibility={visibility} search={search} text={text}>
                <History onClick={onClick}/>
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
