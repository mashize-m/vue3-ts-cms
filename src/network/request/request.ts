import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

// 设置拦截器的类型
interface MSZRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

// 给默认的config类型，扩展上 拦截器类型
interface MSZRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MSZRequestInterceptors<T>
  showLoading?: boolean
}

class MSZRequest {
  instance: AxiosInstance
  //设置拦截器的类型
  interceptors?: MSZRequestInterceptors
  // 设置loadingInstance
  loading?: LoadingInstance
  // 是否显示showloading
  showLoading: boolean

  // 将原来的config类型（AxiosRequestConfig) 扩展 为可添加拦截器的类型(MSZRequestConfig)
  constructor(config: MSZRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors

    // 从config中取出的拦截器 是对应的实例 拦截器
    // 创建实例对象，初始化时就会设置拦截器
    this.instance.interceptors.request.use(
      //实例对象内的interceptors参数
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器---请求成功的拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.2)'
          })
        }
        // this.loading = ElLoading.service({
        //   lock: true,
        //   text: 'Loading',
        //   background: 'rgba(0, 0, 0, 0.5)'
        // })
        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器---请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器---响应成功的拦截')

        // 将loading移除
        // this.loadingInstance?.close()
        // setTimeout(() => {
        //   this.loading?.close()
        // }, 2000)
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有实例都有的拦截器---响应失败的拦截')
        // 将loading移除
        this.loading?.close()
        // 例子：判断不同的HttpErrorCode显示不同的错误信息，可以用switch语句
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  // 单独的某一请求，添加拦截器
  request<T = any>(config: MSZRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      if (this.showLoading) {
        this.showLoading = config.showLoading ?? true
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors?.responseInterceptor(res)
          }
          // console.log(res)

          // 2.将showloading设置为true，这样不会影响下一个请求
          this.showLoading = true

          // 3.将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showloading设置为true，这样不会影响下一个请求
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: MSZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: MSZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MSZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MSZRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MSZRequest
