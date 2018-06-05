export default {
    namespace: 'server',
    state: {
        content: 'testContent',
        itemId: 'testId',
    },
    reducers: {
        change(state, { key, value }) {
            let obj = {}
            obj[key] = value
            return {...state,...obj}
        },
    },
}

