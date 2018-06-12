import React from 'react'
import { Editor } from 'draft-js'
import keyBinding from './keyBinding'

export default function({ editorState, onChange, handleKeyCommand, setRef }) {
    return (
        <Editor 
            editorState={editorState} 
            onChange={onChange} 
            ref={setRef} 
            placeholder={'Do less, get more'}
        />
    )
}
/*
handleKeyCommand={handleKeyCommand}
keyBindingFn={keyBinding}
*/