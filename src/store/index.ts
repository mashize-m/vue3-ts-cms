import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'codemsz',
      age: 18
    }
  },
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
