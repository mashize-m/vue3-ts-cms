// network统一出口
import MSZRequest from './request/request'
import { BASE_URL, TIME_OUT } from './request/config'

import LocalCache from '@/utils/cache'

const mszRequest = new MSZRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  // 这里可以传入interceptors，是因为在类里 interceptors的类型设置为: MSZRequestInterceptors
  interceptors: {
    // 这个config类型还是AxiosRequestConfig?  -->  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptor: (config) => {
      // 携带token
      const token = LocalCache.getCache('token')
      if (config.headers) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      // console.log(config)
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')

      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default mszRequest
