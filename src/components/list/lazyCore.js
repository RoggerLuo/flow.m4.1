import { Model } from 'dva'
import React from 'react'
export default function(){
    import(/* webpackChunkName: "draftEditor" */ 'components/draftEditor')
        .then(draftEditor => {
            const BaseEditor = draftEditor.BaseEditor
            const startFromText = draftEditor.startFromText
            function Core({ content }) {
                return (<BaseEditor editorState={startFromText(content)} readOnly={true}/>)
            }
            Model.change('list','noteCore',Core)
        })
        .catch(error => 'An error occurred while loading the componentNotes/draftEditor')
}
