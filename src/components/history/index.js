import { Model } from 'dva'
import model from './model'
import History from './History'

Model.create(model)
export default History

export function fetch() {
    Model.dispatch({ type: 'history/fetch' })
}
