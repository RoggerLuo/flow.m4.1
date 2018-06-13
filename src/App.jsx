import React from 'react'
import { connect } from 'dva'
import List,{ fetchData, closeSearch, listOnSearch, listAdd, listModify, listRemove, importDraftjsCore } from 'components/list'
import Editor from 'components/editor'
import Add from 'components/Add'
import S from 'components/S'
import SearchPanel,{ toggle, open } from 'components/searchPanel'
import Search from 'components/search'
import { Model } from 'dva'
import NoticeBar, * as nb from 'components/NoticeBar'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={ editorVisible: false }
        this.interfaces = {}
        this.interfaces.listOnSearch = listOnSearch
        this.interfaces.onSave = (note) => listAdd(note)
        this.onSelect = (selectedNote) => {
            this.interfaces.replace(selectedNote)
        }
        fetchData((notes)=>{
            importDraftjsCore()
        })
        this.openSearch = () => {
            open()
            // this.interfaces.searchInput.focus() 
        }
        this.openEditor = () => {
            localStorage.setItem('windowScrollTop',window.scrollY)
            const storageString = localStorage.getItem('_editorNote')
            if(storageString) {
                const note = JSON.parse(storageString)
                this.interfaces.editorReplace(note)
                Model.change('editor','unsaved',true)
            }else{
                this.interfaces.editorNew()
            }
            this.setState({ editorVisible: true },() => { //为了先让editor出现，再focus
                this.interfaces.editorFocus()
            })
        }
        this.interfaces.closeEditor = () => {
            this.setState({ editorVisible: false },()=>{
                const windowScrollTop = localStorage.getItem('windowScrollTop')
                window.scrollTo({top:windowScrollTop})
            })          
        }
    }
    componentDidMount(){}
    render(){
        let listStyle = { flex:'1', display:'flex' }
        if(this.state.editorVisible) {
            listStyle.display = 'none'
        }
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <NoticeBar onClick={closeSearch}/>
                <div style={listStyle}>
                    <List onSelect={this.onSelect}/>
                </div>
                <Editor interfaces={this.interfaces} visibility={this.state.editorVisible}/>
                <Add click={this.openEditor} />
                <S click={this.openSearch}/>
                <SearchPanel interfaces={this.interfaces}>
                    <Search />
                </SearchPanel>
            </div>
        )
    }
}

export default App
