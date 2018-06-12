import React from 'react'

export default function({ isSelected, children }){
    let style = { cursor:'pointer' }
    let _class = ""
    if(isSelected){
        // style = { backgroundColor: '#ececec' } 
        _class = "selectedNote"
    }
    //onClick={select} 
    return (
      <div style={style} className={_class} >
          <div style={{
              userSelect:'none',
              fontSize:'16px',
              lineHeight:'1.5',
              minHeight:'50px',
              padding:'15px 10px 15px 10px'
            }} 
          >
              {children}
          </div>
          <div style={{widht:'100%',height:'1px',borderTop:'0.5px solid #ccc'}}></div>
      </div>
    )
}
