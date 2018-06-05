export default {
    namespace: 'server2',
    state: {
        content: 'testContent',
        itemId: 'testId',
    },
    reducers: {
        change(state, { key, value }) {
            let obj = {}
            obj[key] = value
            return Object.assign({}, state, obj)
        },
    },
    event: {
        onReady(dispatch){
            dispatch({ type:'ChangeAsyncRoger' })
        }
    },
}

