// 封装所有和用户相关的接口函数
import request from '@/utils/http'

export const loginAPI = ({ account, password }) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

export const registerAPI = ({ account, password,check_password }) => {
  return request({
    url: '/user/register',
    method: 'POST',
    data: {
      account,
      password,
      check_password
    }
  })
}

