import React from 'react'
import { connect, Model } from 'dva'
function get(){
    const _searchHistory = localStorage.getItem('_searchHistory')
    if(!_searchHistory) return []
    const history = JSON.parse(_searchHistory)
    return Object
        .keys(history)
        .map(key=>({ word:key, count:history[key] }))
        .sort((a,b)=> b.count - a.count)
        .map(entry=>entry.word)
}
const data = get()
function Tags({ onClick }) {
    return (
        <div className="tag-container">
            {data.map((word,ind)=>{
                return (
                    <div onClick={(e)=>onClick(e,word)} style={{padding:"5px 10px", color:"#888888"}} key={ind}>
                        {word}
                    </div>
                )
            })}
        </div>
    )
}
function LazyComponent({ Component, interfaces, visibility, onSave, closeEditor, tagsPanelVisibility }){
    if(!Component) {
        return (<div></div>)
    }
    let editorStyle = { width:'100%', position:'fixed', top:0, bottom:'44px', left:0, right:0, zIndex: 2, backgroundColor:'white' }
    if(!visibility) {
        editorStyle = { ...editorStyle, display: 'none' }
    }
    const clickTag = (e,tagValue) => {
        interfaces.replaceContent(tagValue)
        Model.change('editor','tagsPanelVisibility',false)
        e.stopPropagation()
    }
    const openTags = e => {
        Model.change('editor','tagsPanelVisibility',true)
        e.stopPropagation()
    }
    const closeTags = e => {
        Model.change('editor','tagsPanelVisibility',false)
        e.stopPropagation()

    }
    return (
        <div id="editor-container" style={editorStyle} onClick={()=>interfaces.editorFocus()}>
            <Component onSave={onSave} interfaces={interfaces} closeEditor={closeEditor} />
            <div onClick={openTags} style={{zIndex:3,textAlign: 'center',position:'fixed',top:'10px',right:'10px',opacity:'0.4',paddingBottom: '10px',paddingLeft: '10px'}}>
                tags
            </div>
            {tagsPanelVisibility?(<div style={{zIndex:4,position:'fixed',bottom:'0px',top:'0px',left:'0px',right:'0px',backgroundColor:'white'}}>
                <Tags onClick={clickTag}/>
                <div 
                    onClick={closeTags} 
                    style={{zIndex:3,textAlign: 'center',position:'fixed',top:'10px',right:'10px',opacity:'0.4',paddingBottom: '10px',paddingLeft: '10px'}}
                >
                    close
                </div>
            </div>):null}

            <div style={{zIndex:3,display:'flex',textAlign: 'center',lineHeight: '44px',position:'fixed',bottom:'0px',left:'0px',right:'0px'}}>
                <div onClick={closeEditor} style={{ flex: '1',backgroundColor: '#f3f3f3' }}>取消</div>
                <div onClick={()=>interfaces.editorSave()} style={{ flex: 1, backgroundColor: 'rgb(16, 142, 233)', color: 'white' }}>保存</div>
            </div>
        </div>
    )
}
function mapToStore(state){
    return { 
        Component: state.editor.component,
        tagsPanelVisibility: state.editor.tagsPanelVisibility
    }
}
export default connect(mapToStore)(LazyComponent)
