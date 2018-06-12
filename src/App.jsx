import React from 'react'
import { connect } from 'dva'
import List,{ fetchData, listAdd, listModify, listRemove, importDraftjsCore } from 'components/list'
import Editor from 'components/editor'
import Add from 'components/Add'
import S from 'components/S'
import SearchPanel,{ toggle, open } from 'components/searchPanel'
import Search from 'components/search'
import { Model } from 'dva'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={ editorVisible:false }
        this.interfaces = {}
        this.onSelect = (selectedNote) => {
            this.interfaces.replace(selectedNote)
        }
        fetchData((notes)=>{
            importDraftjsCore()
        })
        this.openSearch = () => {
            open()
            this.interfaces.searchInput.focus() 
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
                //new or 不new不是在这里决定的, 这里只要把localStorage展示出来就好
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
    componentDidMount(){
        // var mo = function(e){e.preventDefault()}
        // document.getElementById('notes-container').addEventListener("touchmove",mo,false)
    }
    render(){
        // let editorStyle = { height:'100%',width:'100%',position:'fixed',top:0,bottom:0,left:0,right:0, zIndex: 2 }
        // if(!this.state.editorVisible) {
        //     editorStyle = { ...editorStyle, visibility:'hidden'}
        // }
        /*
        <div id="notes-container" style={editorStyle}>
            <Editor interfaces={this.interfaces}/>
        </div>
        */
        let listStyle = { flex:'1', display:'flex' }
        if(this.state.editorVisible) {
            listStyle.display = 'none'
        }
        return (
            <div style={{height:'100%',display:'flex',flexDirection:'column'}}>
                
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
// export default function() {
//     function onChange(){}
//     return (
//         <div>
//             <SearchBar placeholder="Search" maxLength={8} />
//             <div className="tag-container">
//                 <Tag onChange={onChange}>Callback</Tag>
//                 <Tag onChange={onChange}>Callback</Tag>
//             </div>
//         </div>
//     )
// }

/*
    // setTimeout(()=>{ 
        // console.log(this.interfaces.searchInput)

// },500)
*/
/*
<div style={{position:'fixed',width:'100%',top:'0'}}>
    <SearchBar placeholder="Search" maxLength={8} onFocus={toggle} onBlur={toggle}/>
</div>
<div style={{height:'44px',width:'100%'}}></div>
*/

//                        

//{this.props.editorComponent(this.interfaces)}
export default App
// function mapStateToProps(state) {
//     return { 
//         listComponent: state.app.listComponent,
//         editorComponent: state.app.editorComponent
//     }
// }
// export default connect(mapStateToProps)(App)

//<List onSelect={this.onSelect}/>
//<Editor deliver={ Deliver(this.interfaces) }/>
    
// this.replaceHandler = (replacer) => {
//     bridge.replacer = replacer
// }
// this.bridge = bridge
// this.onNewNote = listAdd
// this.onSaveNote = listModify
// this.onDelete = listRemove
// replaceHandler={this.replaceHandler} 
// onNewNote={this.onNewNote} 
// onSaveNote={this.onSaveNote}
// onDelete={this.onDelete}

//style={{width:'100%',height:'100%',overflowY:'scroll'}}