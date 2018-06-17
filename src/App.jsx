import React from 'react'
import { connect, Model } from 'dva'
import { Toast } from 'antd-mobile'
import SearchPanel, * as sp from 'components/searchPanel'
import NoticeBar, * as nb from 'components/NoticeBar'
import List, * as l from 'components/list'
import Editor from 'components/editor'
import Add from 'components/Add'
import S from 'components/S'

function onSearch(res) {
    if (
        (res.length == 1) && (res[0].length == 0)
    ) { //没有搜索到
        Toast.info('没有搜索到', 2, null, false)
        return
    }
    l.renderSearchList(res)
    nb.open(res)
    window.scrollTo({ top: 0 }) //自动返回顶部
}

function closeSearchList() {
    l.closeSearchList()
    window.scrollTo({ top: 0 }) //自动返回顶部
}
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editorVisible: false }
        this.interfaces = { /* openEditor, editorFocus */ }
        l.fetchData(notes => l.importDraftjsCore())
        this.edit = (note) => {
            localStorage.setItem('windowScrollTop', window.scrollY)
            this.interfaces.editorReload(note)
            this.setState({ editorVisible: true }, () => { //为了先让editor出现，再focus
                // this.interfaces.editorFocus()
            })
        }
        this.closeEditor = () => {
            this.setState({ editorVisible: false }, () => {
                const windowScrollTop = localStorage.getItem('windowScrollTop')
                window.scrollTo({ top: windowScrollTop })
            })
        }
        this.add = () => {
            if (localStorage.getItem('_editorNote')) {
                let note = JSON.parse(localStorage.getItem('_editorNote'))   
                this.edit(note)                
            }else{
                this.edit()                
            }
        }
    }
    render() {
        let listStyle = { flex: '1', display: 'flex' }
        if (this.state.editorVisible) {
            listStyle.display = 'none'
        }
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <NoticeBar onClick={closeSearchList}/>
                <div style={listStyle}>
                    <List edit={this.edit}/>
                </div>
                <Editor interfaces={this.interfaces} closeEditor={this.closeEditor} visibility={this.state.editorVisible} onSave={l.add}/>
                <SearchPanel onSearch={onSearch} />
                <Add click={this.add} />
                <S click={sp.open}/>
            </div>
        )
    }
}
export default App