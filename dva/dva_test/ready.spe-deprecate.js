import test from '../../utils/test.js'
import _test from 'tape'
import model2 from './model2'
import dva from '../index.js'
import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

const app = dva

test('tape测试框架 \n不同文件共享同一个运行时？', (t) => {
    t('跑完之前的测试，reduce.server应该存在,content内容应该是sagaTestFinal', () => {
        return 'yuanyuan' == app._store.getState().server.content
    })
})

_test('dva.model.onReady', (t) => {
    dva.saga('ChangeAsyncRoger', function*(action, { put }) {
        yield delay(1500)
        yield put({ type: 'server2/change', key: 'content', value: 'onReadyExecute' })
    })
    app.model(model2)
    setTimeout(function() {
        t.equal(
            app._store.getState().server2.content,
            'onReadyExecute',
            'reducer添加成功的时候会触发onReady并dispatch一个saga'
        )
        t.end()
    }, 2500)
})