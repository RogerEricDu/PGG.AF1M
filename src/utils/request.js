//utils常见文件，用来配置和封装axios
//设置请求的默认参数、拦截器等
import axios from 'axios'
import { ElMessage } from 'element-plus' //库中的 Message 组件，用来显示通知或提示信息
import { getToken } from '@/utils/auth'

// 创建一个 Axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // API的基础路径
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求头中加入 Token
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    // 请求错误时的处理
    console.error(error)
    return Promise.reject(error)
 }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== 200) {
        // 如果后端返回的 code 不为 200，则视为错误
        ElMessage({
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
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5000
      })
      return Promise.reject(error)
    }
)
  
export default service