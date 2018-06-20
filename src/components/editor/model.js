import { Toast } from 'antd-mobile'
import invariant from 'invariant'
export default {
    namespace: 'editor',
    state: { unsaved: false },
    reducers: {
        onChange(state,action) {
            return state
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
            const { itemId, content } = { ...note }
            if (content) {
                const res = yield call(fetch, `note/${itemId}`, { method: 'post', body: { content } })
                if (res != 'ok') {
                    Toast.offline(`保存失败: ${res}`, 2)
                    return
                }else{
                    Toast.info('保存成功', 1)
                    callback && callback(note) 
                }
            }
        }
    },
    event: {
        onReady(dispatch) {

        }
    }
}
// yield put({ ...note, type: 'postServer', callback })
// * postServer({ itemId, content, callback }, { fetch, call, put }) {
//     // 不直接调用，由save调用
//     const res = yield call(fetch, `note/${itemId}`, { method: 'post', body: { content } })
//     if (res !== 'ok') {
//         Toast.offline(`保存失败: ${res}`, 1)
//         return
//     }
//     callback && callback({ itemId, content })
// }