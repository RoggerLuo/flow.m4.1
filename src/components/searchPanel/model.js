import { Toast } from 'antd-mobile'
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
        * search({ queryStr, onSearch }, { fetch, call, put }) {
            if(!queryStr) return
            if(queryStr == ' ') return
            const res = yield call(fetch, `search/${queryStr}`)
            if(res instanceof Array) {
                onSearch && onSearch(res)                
            }else{
                Toast.offline(`搜索失败: ${res}`,3,null,false)
            }
        }
    },
    event: {
        onReady(dispatch) {

        }
    }
}
