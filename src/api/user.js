// 封装所有和用户相关的接口函数
import request from '@/utils/request'

export function getUserInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}

export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function userSignUp(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
