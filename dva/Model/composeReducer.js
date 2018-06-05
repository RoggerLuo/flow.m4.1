import invariant from 'invariant'

export default function({ reducers, state, namespace }) {
    const defaultState = state || {}
    invariant(namespace, `reducer's property namespace can't find`)
    const reducersArray = Object.keys(reducers).map(type => //type就是model里各个reduce的key
        handleAction(namespace + '/' + type, reducers[type]) // 自动把namespace加上
    )
    injectDefaultReducer(namespace,reducersArray, reducers)
    const modelReducer = reduceReducers(...reducersArray) //数组变成 逗号分隔的参数传入，然后又转回来（可以看成克隆）
    return (state = defaultState, action) => modelReducer(state, action)
    /* 最后这个包装函数很关键，直接返回modelReducer就无法装载上这个默认值 */
}

function injectDefaultReducer(namespace,reducersArray,reducers) {
    const nameConflict = Object.keys(reducers).some(type => ['change', 'std'].indexOf(type) != -1)
    invariant(!nameConflict, `reducer:[${namespace}]的方法名冲突，请勿使用"change"和"std"作为方法名`)
    reducersArray.push(handleAction(namespace + '/change', (state, { key, value }) => {
        const obj = {}
        obj[key] = value
        return Object.assign({},state,obj)
    }))
    reducersArray.push(handleAction(namespace + '/std', (state, action) => {
        return action.reducer(state)
    }))
}

function handleAction(actionType, reducer = identify) {
    return (state, action) => {
        const { type } = action
        invariant(type, 'dispatch: action should be a plain Object with type')
        if (actionType === type) {
            return reducer(state, action)
        }
        return state
    }
}

function reduceReducers(...reducers) {
    return (previous, currentAction) => // currentAction 包含了行为type、数据，具体怎么处理还要看type对应的reducer
        reducers.reduce((p, currentReducerMethod) => currentReducerMethod(p, currentAction), previous)
    /*
        初始状态（上一次调用的返回state)作为当前reduce方法的输入state, reduce比forEach、map多一个参数
        意思就是把所有的reduce都跑了一遍，从头到位，
        因为校验type的代码写在了函数实例里面，等于把switch放在了各个实例函数里面
    */
}

function identify(value) {
    return value
}