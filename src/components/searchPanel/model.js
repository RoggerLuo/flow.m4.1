import invariant from 'invariant'
export default {
    namespace: 'searchPanel',
    state: {
        visibility: false,
        text: ''
    },
    reducers: {
        onChange(state,{ text }) {
            return { ...state, text }
        },
        toggle(state) {
            return { ...state, visibility: !state.visibility }
        }
    },
    effects: {
        * search({ queryStr, onSearchResult }, { fetch, call, put }) {
            if(queryStr === '') {
                return
            }
            const res = yield call(fetch, `search/${queryStr}`) //没写完
            onSearchResult && onSearchResult(res)
        },        
        * save({ unsaved, editorState, itemId }, { fetch, call, put }) {
            invariant(!!itemId,'itemId没有传入')
            if (unsaved) {
                const contentState = editorState.getCurrentContent()
                const text = contentState.getPlainText()
                yield put({ type: 'postServer', content: text, itemId })
            }
        },
        * postServer({ itemId, content }, { fetch, call, put }) {
            // 不直接调用，由save调用
            yield put({ type: 'change', key: 'unsaved', value: false })
            const res = yield call(fetch, `note/${itemId}`, { method: 'post', body: { content } })
            if (res !== 'ok') {
                alert(`request error:${res}`)
                yield put({ type: 'change', key: 'unsaved', value: true })
                return
            }
        }
    },
    event: {
        onReady(dispatch) {

        }
    }
}
