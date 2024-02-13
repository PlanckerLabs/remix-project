import SurgeClient from 'surge-client'
import axios from 'axios'
import {type ModelType} from '../store'

const surgeClient = new SurgeClient({
  proxy: 'http://127.0.0.1:3003',
  onError: (err: Error) => {
    console.log(err)
  },
})

const Model: ModelType = {
  namespace: 'instance',
  state: {
    name: '',
    address: '',
    network: '',
    abi: [],
    defaultAbi: [],
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload}
    },
  },
  effects: {
    *deploy({payload}, {select}) {
      yield surgeClient.login({
        user: payload.email,
        password: payload.password,
      })
      const {data} = yield axios.get('https://remix-dapp.surge.sh/manifest.json')
      const {file, css, assets} = data['index.html']
      const paths = ['index.html', file, ...css, ...assets]

      const {defaultAbi, ...instance} = yield select((state) => state.instance)

      const files: Record<string, string> = {'instance.json': JSON.stringify(instance)}

      for (let index = 0; index < paths.length; index++) {
        const path = paths[index]
        const resp = yield axios.get(`https://remix-dapp.surge.sh/${path}`)
        files[path] = resp.data
      }

      yield surgeClient.publish({
        files,
        domain: `${payload.subdomain}.surge.sh`,
        onProgress: ({id, progress, file}: {id: string; progress: number; file: string}) => {
          console.log({id, progress, file})
        },
        onTick: (tick: string) => {},
      })
    },
  },
}

export default Model
