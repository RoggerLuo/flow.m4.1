import buildHistory from './buildHistory'
export default {
    namespace: 'history',
    state: { data: [] },
    reducers: {},
    effects: {
        * fetch(p, { fetch, call, put }) {
            const data = yield call(fetch, `history`)
            const kvData = data.map(entry => {
                const word = entry[1]
                const timestamp = entry[2]
                return { word, timestamp }
            })
            const history = buildHistory(kvData)
            yield put({ type: 'change', key:'data', value: history })
        }
    },
    event: {
        onReady(dispatch) {

        }
    }
}
