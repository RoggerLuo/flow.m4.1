import React from 'react'
import { connect, Model } from 'dva'
import History from 'components/history'
Model.create({
    namespace: 'tagsPanel',
    visibility: false
})
function TagsPanel({ tube, visibility }){
    const clickTag = tagValue => {
        tube.addTagContent(tagValue)
        Model.change('tagsPanel','visibility',false)
    }
    const openTags = e => {
        Model.change('tagsPanel','visibility',true)
        e.stopPropagation()
    }
    const closeTags = e => {
        Model.change('tagsPanel','visibility',false)
        e.stopPropagation()
    }
    const panelStyle = {zIndex:3,textAlign: 'center',position:'fixed',top:'10px',right:'10px',opacity:'0.4',paddingBottom: '10px',paddingLeft: '10px'}
    if(visibility) {
        return (
            <div style={{zIndex:4,position:'fixed',bottom:'0px',top:'0px',left:'0px',right:'0px',backgroundColor:'white'}}>
                <History onClick={clickTag}/>
                <div onClick={closeTags} style={panelStyle}>close</div>
            </div>
        )
    }else{
        return (<div onClick={openTags} style={panelStyle}>tags</div>)
    }
}
function mapToStore(state){
    return { visibility: state.tagsPanel.visibility}
}
export default connect(mapToStore)(TagsPanel)
