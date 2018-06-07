import React from 'react'
import { Editor } from 'draft-js'

export default function({ editorState, onChange, readOnly, handleKeyCommand, keyBinding, setRef }) {
    const emptyFunc = () => {}
    if(handleKeyCommand && keyBinding) {
        return (
            <Editor 
                editorState={editorState} 
                onChange={onChange||emptyFunc} 
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={keyBinding}
                ref={setRef||emptyFunc} 
            />
        )
    }
    return (
        <Editor 
            editorState={editorState} 
            onChange={onChange||emptyFunc} 
            ref={setRef||emptyFunc} 
            readOnly={readOnly||false}
        />
    )
}
