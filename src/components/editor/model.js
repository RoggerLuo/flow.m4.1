import invariant from 'invariant'
export default {
    namespace: 'editor',
    state: {
        unsaved: false
    },
    reducers: {
        onChange(state,action) {
            return { ...state, unsaved: true }
        }
    },
    effects: {
        * delete({ itemId, callback }, { fetch, call, put }) {
            invariant(!!itemId,'itemId没有传入')
            const res = yield call(fetch, `note/${itemId}`, { method: 'delete' })
            // 不知道为什么DELETE的没有返回，server端给了返回的
            callback && callback()
        },        
        * save({ note, callback }, { fetch, call, put }) {
            if (note.content) {
                yield put({ ...note, type: 'postServer' })
                callback && callback(note)
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
