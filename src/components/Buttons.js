import React from 'react'

export default function({ save, cancel, search }){ 
    const _save = (e) => {
        save()
        e.stopPropagation()
    }
    return (
        <div style={{zIndex:3,display:'flex',textAlign: 'center',lineHeight: '44px',position:'fixed',bottom:'0px',left:'0px',right:'0px'}}>
            <div onClick={search} style={{ flex: '1',backgroundColor: '#89ceff',color: 'white' }}>搜索</div>
            <div onClick={cancel} style={{ flex: '1',backgroundColor: '#f3f3f3' }}>取消</div>
            <div onClick={_save} style={{ flex: 1, backgroundColor: 'rgb(16, 142, 233)', color: 'white' }}>保存</div>
        </div>
    )
}
