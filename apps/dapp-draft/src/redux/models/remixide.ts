import {type ModelType} from '../store'
import remixClient from '../../remix-client'

const Model: ModelType = {
  namespace: 'remixide',
  state: {},
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    *connect(_, {put}) {
      yield put({
        type: 'loading/save',
        payload: {
          screen: true,
        },
      })

      yield remixClient.onload()

      yield put({
        type: 'loading/save',
        payload: {
          screen: false,
        },
      })
    },
  },
}

export default Model
