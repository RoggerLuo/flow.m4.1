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
        * save({ note, callback }, { fetch, call, put }) {
            const { itemId, content } = { ...note }
            if (content) {
                const res = yield call(fetch,`note/${itemId}`,{ method: 'post', body: { content } })
                if (res != 'ok') {
                    Toast.offline(`保存失败: ${res}`,3,null,false)
                    return
                }else{
                    Toast.info('保存成功',1,null,false)
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
