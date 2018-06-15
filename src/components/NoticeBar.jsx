import React from 'react'
import { NoticeBar } from 'antd-mobile'
import { connect, Model } from 'dva'
Model.create({
    namespace:'noticeBar',
    state:{ visibility: false, content: '' }
})
function mapToStore(state){
    return {
        content: state.noticeBar.content,
        visibility: state.noticeBar.visibility
    }
}
export default connect(mapToStore)(function({ onClick, visibility, content }){
    if(!visibility) return null
    const _onClick = () => {
        onClick()
        Model.change('noticeBar','visibility',false)
    }
    return (
        <div style={{height:'36px',width:'100%'}}>
            <div style={{position:'fixed',top:0,left:0,right:0,height:'36px'}}>
                <NoticeBar marqueeProps={{loop:true,fps:20,style:{fontSize:'15px'}}} onClick={_onClick} mode="closable" icon={null}>{content}</NoticeBar>
            </div>
        </div>
    )  
})
export function open(res){
    let content = ''
    res.forEach(group=>{
        content = group.map(entry=>entry.word).join(' ')
    })
    Model.change('noticeBar','visibility',true)    
    Model.change('noticeBar','content',content)
}