import React from 'react'
// import { Editor } from 'draft-js'
// import {startFromText} from './draft'
import { startFromText, BaseEditor } from 'components/draftEditor'
export function NoteContent({ itemId, content, select }){
    return (
        <div 
          onClick={select}
          style={{userSelect:'none',fontSize:'16px',lineHeight:'1.5',minHeight:'50px',padding:'15px 10px 15px 10px'}} 
        >
            <BaseEditor 
                editorState={startFromText(content)} 
                readOnly={true}
            />
        </div>
    )
}

export function NoteWrapper({ isSelected, children }){
    let style = { cursor:'pointer' }
    let _class = ""
    if(isSelected){
        // style = { backgroundColor: '#ececec' } 
        _class = "selectedNote"
    }
    return (
      <div style={style} className={_class}>
          {children}
          <div style={{widht:'100%',height:'1px',borderTop:'0.5px solid #ccc'}}></div>
      </div>
    )
}
