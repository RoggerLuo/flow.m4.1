import React from 'react'
import { Editor } from 'draft-js'
import img from './bg.png'

export default function({ editorState, onChange, setRef }){
    return (
        <div style={{ fontSize:'17px', cursor:'text', height:'100%', overflow:'auto', backgroundImage: `url(${img})` }}>
            <div style={{ padding: '15px'}}>
                <Editor 
                    editorState={editorState} 
                    onChange={onChange} 
                    ref={setRef} 
                    placeholder={'Do less, get more'}
                />
            </div>
        </div>
    )
}
