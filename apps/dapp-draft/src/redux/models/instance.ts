import SurgeClient from 'surge-client'
import {type ModelType} from '../store'
import {execution} from '@remix-project/remix-lib'
// @ts-expect-error
import template from 'raw-loader!../../template.html'

const {encodeFunctionId} = execution.txHelper

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
    init(state, {payload}) {
      const abi = payload.abi.filter((item) => {
        if (item.type === 'function') {
          item.id = encodeFunctionId(item)
          return true
        } else {
          return false
        }
      })
      return {...state, ...payload, abi, defaultAbi: abi}
    },
    reset(state, _) {
      return {...state, abi: state.defaultAbi}
    },
    empty(state, _) {
      return {...state, abi: [], defaultAbi: []}
    },
  },
  effects: {
    *deploy({payload}, {select}) {
      yield surgeClient.login({
        user: payload.email,
        password: payload.password,
      })
      // const {data} = yield axios.get('https://remix-dapp.surge.sh/manifest.json')
      // const {file, css, assets} = data['index.html']
      // const paths = [file, ...css, ...assets]

      const {defaultAbi, ...instance} = yield select((state) => state.instance)

      const files: Record<string, string> = {'dir/instance.json': JSON.stringify(instance), 'dir/index.html': template}

      // for (let index = 0; index < paths.length; index++) {
      //   const path = paths[index]
      //   // const resp = yield axios.get(`https://remix-dapp.surge.sh/${path}`)
      //   // files[`dir/${path}`] = resp.data
      //   files['dir/index.html'] = files['dir/index.html'].replace(`/${path}`, `https://remix-dapp.surge.sh/${path}`)
      // }

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
