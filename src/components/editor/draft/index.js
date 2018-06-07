import { EditorState, ContentState } from 'draft-js'
import decorator from './decorator'
import BaseEditor from './BaseEditor'

export { BaseEditor }

export function startFromText(text){
    const cs = ContentState.createFromText(text) 
    return EditorState.createWithContent(cs,decorator)
}

export const startFromScratch = () => EditorState.createEmpty(decorator) 
