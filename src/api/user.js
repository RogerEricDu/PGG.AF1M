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


// 删除用户
export function deleteUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'delete'
  })
}

//用户查看个人当前任务状态
export function checkUserTask(data) {
  return request({
    url: '/profile/taskStatus',
    method: 'post',
    data
  })
}