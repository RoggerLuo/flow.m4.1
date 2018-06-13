import React from 'react'
import { NoticeBar } from 'antd-mobile'
import { connect, Model } from 'dva'
Model.create({
    namespace:'noticeBar',
    state:{ visibility: false, content: '' }
})
function mapToStore(state){
    return {
        content: state.content,
        visibility: state.visibility
    }
}
export default connect(mapToStore)(function({ onClick, visibility, content }){
    if(!visibility) return null
    return (
        <div>
            <div style={{height:'36px',width:'100%'}}></div>
            <div style={{position:'fixed',top:0,left:0,right:0,height:'36px'}}>
                <NoticeBar onClick={onClick} mode="closable" icon={null}>{content}</NoticeBar>
            </div>
        </div>
    )  
})

export function loadContent(content){
    Model.change('noticeBar','content',content)
}
export function open(){
    Model.change('noticeBar','visibility',true)    
}
export function close(){
    Model.change('noticeBar','visibility',false)        
}