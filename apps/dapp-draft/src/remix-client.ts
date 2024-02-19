import {PluginClient} from '@remixproject/plugin'
import {createClient} from '@remixproject/plugin-webview'
import {store} from './redux/store'

class RemixClient extends PluginClient {
  constructor() {
    super()
    createClient(this)
  }

  edit({address, abi, network, name}): void {
    console.log('edit dapp', address, abi, network, name)
    store.dispatch({
      type: 'instance/init',
      payload: {
        address,
        abi,
        network,
        name,
      },
    })
  }
}

export default new RemixClient()
