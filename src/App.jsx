import React from 'react'
import { connect, Model } from 'dva'
import { Toast } from 'antd-mobile'
import SearchPanel, * as searchPanel from 'components/searchPanel'
import NoticeBar, * as noticeBar from 'components/NoticeBar'
import List, * as l from 'components/list'
import Editor from 'components/editor'
import Add from 'components/Add'
import S from 'components/S'
import * as history from 'components/history'
import TagsPanel4editor from 'components/TagsPanel4editor'
import Buttons from 'components/Buttons'

function onSearch(res) {
    if (
        (res.length == 1) && (res[0].length == 0)
    ) { //没有搜索到
        Toast.info('没有搜索到', 2, null, false)
        return
    }
    l.renderSearchList(res)
    noticeBar.open(res)
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
        this.editorTube = {/* edit */}
        l.fetchData(notes => l.importDraftjsCore())
        this.startEditing = (note) => {
            localStorage.setItem('windowScrollTop', window.scrollY)
            this.editorTube.edit(note)
            this.setState({ editorVisible: true },()=>{
                if(!note) { //新建
                    this.editorTube.focus()
                }
            })
        }
        this.editorOnSave = (note) => {
            l.add(note)
            this.closeEditorPanel()
        }
        this.closeEditorPanel = () => {
            this.setState({ editorVisible: false }, () => {
                window.scrollTo({ top: localStorage.getItem('windowScrollTop') })
            })
        }
        this.add = () => this.startEditing(false)            
    }
    componentDidMount(){
        history.fetch()
    }
    render() {
        let listStyle = { display: 'block' }
        let editorStyle = { width:'100%', position:'fixed', top:0, bottom:'44px', left:0, right:0, zIndex: 2, backgroundColor:'white' }
        if (this.state.editorVisible) {
            listStyle.display = 'none'
        }else{
            editorStyle = { ...editorStyle, display: 'none' }   
        }
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                
                <div style={listStyle}>
                    <NoticeBar onClose={closeSearchList}/>
                    <Add click={this.add} />
                    <S click={searchPanel.open}/>
                    <List clickNote={this.startEditing}/>
                </div>
                
                <div style={editorStyle} onClick={()=>this.editorTube.focus()}>
                    <Editor onSave={this.editorOnSave} tube={this.editorTube}/>
                    <TagsPanel4editor tube={this.editorTube} closeEditorPanel={this.closeEditorPanel}/>
                    <Buttons cancel={this.closeEditorPanel} save={()=>this.editorTube.save()}/>
                </div>
                <SearchPanel onSearch={onSearch} />
            </div>
        )
    }
}
export default App
// <Editor tube={this.editorTube} visibility={this.state.editorVisible} onSave={editorOnSave}/>
