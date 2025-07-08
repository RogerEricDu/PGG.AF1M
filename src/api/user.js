// 封装所有和用户相关的接口函数
import request from '@/utils/request'

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取所有用户（管理员）
export function getAllUsers() {
  return request({
    url: '/user',
    method: 'get'
  })
}

// 删除用户（管理员）
export function deleteUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}

// 用户查看当前任务状态（非userController，按你原来保留）
export function checkUserTasks(data) {
  return request({
    url: '/profile/tasks',
    method: 'post',
    data
  })
}

// 用户获取（非userController，按你原来保留）
export function searchUserInfo(data){
  return request({
    url: '/profile/userInfo',
    method: 'post',
    data
  })
}