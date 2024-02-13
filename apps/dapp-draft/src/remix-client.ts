import {PluginClient} from '@remixproject/plugin'
import {createClient} from '@remixproject/plugin-webview'
import {store} from './redux/store'

class RemixClient extends PluginClient {
  constructor() {
    super()
    createClient(this)
  }

  edit(address: string, abi: any, network: string, name: string): void {
    console.log('edit dapp', address, abi, network, name)
    store.dispatch({
      type: 'instance/save',
      payload: {
        address,
        abi,
        network,
        name,
        defaultAbi: abi,
      },
    })
  }
}

export default new RemixClient()
