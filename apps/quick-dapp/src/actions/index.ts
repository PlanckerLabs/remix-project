import axios from 'axios';
import { omitBy } from 'lodash';
import { execution } from '@remix-project/remix-lib';
import SurgeClient from '@drafish/surge-client';
import remixClient from '../remix-client';
import { themeMap } from '../components/DeployPanel/theme';

const { encodeFunctionId } = execution.txHelper;

const surgeClient = new SurgeClient({
  // surge backend doesn't support cross-domain, that's why the proxy goes
  // here is the codebase of proxy: https://github.com/drafish/vercel-proxy
  proxy: 'https://vercel-proxy-bice-six.vercel.app',
  onError: (err: Error) => {
    console.log(err);
  },
});

let dispatch: any, state: any;

export const initDispatch = (_dispatch: any) => {
  dispatch = _dispatch;
};

export const updateState = (_state: any) => {
  state = _state;
};

export const connectRemix = async () => {
  await dispatch({
    type: 'SET_LOADING',
    payload: {
      screen: true,
    },
  });

  await remixClient.onload();

  await dispatch({
    type: 'SET_LOADING',
    payload: {
      screen: false,
    },
  });
};

export const saveDetails = async (payload: any) => {
  const { abi, userInput, natSpec } = state.instance;

  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      abi: {
        ...abi,
        [payload.id]: {
          ...abi[payload.id],
          details:
            natSpec.checked && !payload.details
              ? natSpec.methods[payload.id]
              : payload.details,
        },
      },
      userInput: {
        ...omitBy(userInput, (item) => item === ''),
        methods: omitBy(
          {
            ...userInput.methods,
            [payload.id]: payload.details,
          },
          (item) => item === ''
        ),
      },
    },
  });
};

export const saveTitle = async (payload: any) => {
  const { abi } = state.instance;

  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      abi: {
        ...abi,
        [payload.id]: { ...abi[payload.id], title: payload.title },
      },
    },
  });
};

export const getInfoFromNatSpec = async (value: boolean) => {
  const { abi, userInput, natSpec } = state.instance;
  const input = value
    ? {
      ...natSpec,
      ...userInput,
      methods: { ...natSpec.methods, ...userInput.methods },
    }
    : userInput;
  Object.keys(abi).forEach((id) => {
    abi[id].details = input.methods[id] || '';
  });
  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      abi,
      title: input.title || '',
      details: input.details || '',
      natSpec: { ...natSpec, checked: value },
    },
  });
};

export const deploy = async (payload: any, callback: any) => {
  const surgeToken = localStorage.getItem('__SURGE_TOKEN');
  const surgeEmail = localStorage.getItem('__SURGE_EMAIL');
  let isLogin = false;
  if (surgeToken && surgeEmail === payload.email) {
    try {
      await surgeClient.whoami();
      isLogin = true;
    } catch (error) {
      /* empty */
    }
  }
  if (!isLogin) {
    try {
      await surgeClient.login({
        user: payload.email,
        password: payload.password,
      });
      localStorage.setItem('__SURGE_EMAIL', payload.email);
      localStorage.setItem('__SURGE_PASSWORD', payload.password);
      localStorage.setItem('__DISQUS_SHORTNAME', payload.shortname);
    } catch (error: any) {
      callback({ code: 'ERROR', error: error.message });
      return;
    }
  }

  const { data } = await axios.get(
    // It's the json file contains all the static files paths of dapp-template.
    // It's generated through the build process automatically.
    'https://remix-dapp.pages.dev/manifest.json'
  );

  let paths: any = [];

  Object.keys(data).forEach((key) => {
    if (data[key].src === 'index.html') {
      const { src, file, css, assets } = data[key];
      paths = paths.concat([src, file, ...css, ...assets]);
    } else {
      paths.push(data[key].file);
    }
  });

  const instance = state.instance;

  const files: Record<string, string> = {
    'dir/instance.json': JSON.stringify({
      ...instance,
      shortname: payload.shortname,
      shareTo: payload.shareTo,
    }),
  };

  // console.log(
  //   JSON.stringify({
  //     ...instance,
  //     shareTo: payload.shareTo,
  //   })
  // );

  for (let index = 0; index < paths.length; index++) {
    const path = paths[index];
    // download all the static files from the dapp-template domain.
    // here is the codebase of dapp-template: https://github.com/drafish/remix-dapp
    const resp = await axios.get(`https://remix-dapp.pages.dev/${path}`);
    files[`dir/${path}`] = resp.data;
  }

  files['dir/index.html'] = files['dir/index.html'].replace(
    'assets/css/themes/remix-dark_tvx1s2.css',
    themeMap[instance.theme].url
  );

  try {
    await surgeClient.publish({
      files,
      domain: `${payload.subdomain}.surge.sh`,
      onProgress: ({
        id,
        progress,
        file,
      }: {
        id: string;
        progress: number;
        file: string;
      }) => {
        // console.log({ id, progress, file });
      },
      onTick: (tick: string) => {},
    });
  } catch ({ message }: any) {
    if (message === '403') {
      callback({ code: 'ERROR', error: 'this domain belongs to someone else' });
    } else {
      callback({ code: 'ERROR', error: 'gateway timeout, please try again' });
    }
    return;
  }

  callback({ code: 'SUCCESS', error: '' });
  return;
};

export const initInstance = async ({
  methodIdentifiers,
  devdoc,
  ...payload
}: any) => {
  const functionHashes: any = {};
  const natSpec: any = { checked: false, methods: {} };
  if (methodIdentifiers && devdoc) {
    for (const fun in methodIdentifiers) {
      functionHashes[`0x${methodIdentifiers[fun]}`] = fun;
    }
    natSpec.title = devdoc.title;
    natSpec.details = devdoc.details;
    Object.keys(functionHashes).forEach((hash) => {
      const method = functionHashes[hash];
      if (devdoc.methods[method]) {
        const { details, params, returns } = devdoc.methods[method];
        const detailsStr = details ? `@dev ${details}` : '';
        const paramsStr = params
          ? Object.keys(params)
            .map((key) => `@param ${key} ${params[key]}`)
            .join('\n')
          : '';
        const returnsStr = returns
          ? Object.keys(returns)
            .map(
              (key) =>
                `@return${/^_\d$/.test(key) ? '' : ' ' + key} ${returns[key]}`
            )
            .join('\n')
          : '';
        natSpec.methods[hash] = [detailsStr, paramsStr, returnsStr]
          .filter((str) => str !== '')
          .join('\n');
      }
    });
  }

  const abi: any = {};
  payload.abi.forEach((item: any) => {
    if (item.type === 'function') {
      item.id = encodeFunctionId(item);
      abi[item.id] = item;
    }
  });
  const ids = Object.keys(abi);
  const items =
    ids.length > 2
      ? {
        A: ids.slice(0, ids.length / 2 + 1),
        B: ids.slice(ids.length / 2 + 1),
      }
      : { A: ids };
  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      ...payload,
      abi,
      items,
      containers: Object.keys(items),
      natSpec,
    },
  });
};

export const resetInstance = async () => {
  const abi = state.instance.abi;
  const ids = Object.keys(abi);
  ids.forEach((id) => {
    abi[id] = { ...abi[id], title: '', details: '' };
  });
  const items =
    ids.length > 1
      ? {
        A: ids.slice(0, ids.length / 2 + 1),
        B: ids.slice(ids.length / 2 + 1),
      }
      : { A: ids };
  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      items,
      containers: Object.keys(items),
      title: '',
      details: '',
      abi,
    },
  });
};

export const emptyInstance = async () => {
  await dispatch({
    type: 'SET_INSTANCE',
    payload: {
      name: '',
      address: '',
      network: '',
      abi: {},
      items: {},
      containers: [],
      title: '',
      details: '',
      theme: 'Dark',
      userInput: { methods: {} },
      natSpec: { checked: false, methods: {} },
    },
  });
};

export const selectTheme = async (selectedTheme: string) => {
  await dispatch({ type: 'SET_INSTANCE', payload: { theme: selectedTheme } });

  const linkEles = document.querySelectorAll('link');
  const nextTheme = themeMap[selectedTheme]; // Theme
  for (const link of linkEles) {
    if (link.href.indexOf('/assets/css/themes/') > 0) {
      link.href = 'https://remix.ethereum.org/' + nextTheme.url;
      document.documentElement.style.setProperty('--theme', nextTheme.quality);
      break;
    }
  }
};
