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
  }).then(response => {
    // 假设后端返回的数据中有一个字段叫 `token`
    const token = response.data.token;
    // 将token存储在localStorage
    localStorage.setItem('token', token);
    return response;
  });
}

export function getUserData() {
  const token = localStorage.getItem('token');
  return request({
    url: '/user/data',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function userSignUp(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
