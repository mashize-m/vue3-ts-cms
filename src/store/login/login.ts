import { Module } from 'vuex'

import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  // 命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction({ commit }, payload: any) {
      // commit('accountLoginAction', payload);
      console.log('执行accountLoginAction', payload)
    }
  }
}

export default loginModule
