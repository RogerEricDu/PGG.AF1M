//utils常见文件，用来配置和封装axios
//设置请求的默认参数、拦截器等
import axios from 'axios'
import { getToken } from '@/utils/auth'

// 创建一个 Axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 使用 import.meta.env 代替 process.env
  timeout: 5000
})

/* // request interceptor
service.interceptors.request.use(
  config => {

    if (store.getters.token) {
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
 */
// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token // 添加 Bearer 前缀
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== 200) {
        // 如果后端返回的 code 不为 200，则视为错误
        this.$message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    },
    error => {
      console.error('Response error: ', error)
      this.$message({
        message: error.message,
        type: 'error',
        duration: 5000
      })
      return Promise.reject(error)
    }
)
  
export default service