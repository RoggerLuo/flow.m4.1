import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from 'components/draftEditor'
import { Model } from 'dva'

export default function() {
    const self = this
    let newNoteAdded = false
    let oldText = ''
    return {
        deleteNote() {
            const { itemId, editorState } = self.state
            // 构建hint
            let content = editorState.getCurrentContent().getPlainText()
            if (content.length > 20) {
                content = content.slice(0, 20) + '...'
            }
            if (!confirm(`确定要删除当前文章吗?\n"${content}"`)) return
            // 发送请求，执行callback
            const callback = () => self.props.onDelete(itemId)
            Model.dispatch({ type: 'editor/delete', itemId, callback })
        },
       
        // newNote() {
        //     debugger
        //     console.log('new note.')
        //     const itemId = Date.parse(new Date()) / 1000
        //     debugger
        //     self.setState({ editorState: startFromScratch(), itemId }, () => {
        //         console.log('(???)')
        //         debugger
        //         window.localStorage.setItem('_editorNote',JSON.stringify({ content:'', itemId }))
        //     })
        // },
        replace(note) {
            const editorState = startFromText(note.content)
            oldText = editorState.getCurrentContent().getPlainText()
            self.setState({ editorState, itemId: note.itemId })
        },
        onChange(editorState) {
            const newText = editorState.getCurrentContent().getPlainText()
            self.setState({ editorState }, () => {
                if (newText !== oldText) {
                    Model.change('editor', 'unsaved', true)
                    oldText = newText
                    window.localStorage.setItem('_editorNote',JSON.stringify({content:newText,itemId:self.state.itemId}) )
                }
            })
        },
        focus() {
            if (document.activeElement.contentEditable != 'true') {
                self.setState({ editorState: moveSelectionToEnd(self.state.editorState) }, () => {
                    self.state.inputDOM.focus()
                })
            }
        }
    }
}