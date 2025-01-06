// 封装所有和用户相关的接口函数
import request from '@/utils/request'

//创建用户
export function userSignUp(data){
  return request({
    url:'/user/userSignUp',
    method:'post',
    data
  })
}
//修改用户密码
export function updateInfo(data){
  return request({
    url:'/user/updateInfo',
    method:'post',
    data
  })
}

//登录
export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  }).then(response => {
    // 假设后端返回的数据中有一个字段叫 `token`
    const token = response.data;
    // 将token存储在localStorage
    localStorage.setItem('token', token);
    return response;
  });
}

// 登出，需要后端提供的登出接口
export function userLogout() {
  return request({
    url: '/user/logout', 
    method: 'post',
  }).then(response => {
    // 清除localStorage中的Token
    localStorage.removeItem('token');
    return response;
  });
}

//获取用户信息
export function getUserData() {
  const token = localStorage.getItem('token');
  return request({
    url: '/user/info',
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

