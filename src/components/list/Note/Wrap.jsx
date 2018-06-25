import React from 'react'

export default function({ onClick, onDelete, children }) {
    const _onClick = (e) => {
        onClick()
        e.stopPropagation()
        e.preventDefault()
    }
    const _onDelete = (e) => {
        onDelete()
        e.stopPropagation()
        e.preventDefault()
    }
    return (
        <div onClick={_onClick}>
            <div
                style={{
                    userSelect:'none',
                    fontSize:'16px',
                    lineHeight:'1.5',
                    minHeight:'50px',
                    padding:'20px 10px 20px 10px'
                }} 
            >
                {children}
            </div>
            <div style={{widht:'100%',height: '1px',borderBottom:'0.5px solid #ccc',textAlign:'right',color:'#e2e2e2'}}>
                <span 
                    onClick={_onDelete} 
                    style={{fontFamily: 'fantasy',position:'relative',bottom:'24px',fontSize:'20px',padding: '5px 12px 5px 0px'}}
                >
                    x
                </span>
            </div>
        </div>
    )
}
