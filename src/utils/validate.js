// 验证邮箱格式
export function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return regex.test(email)
}
  
// 验证密码长度
export function isValidPassword(password) {
  return password.length >= 6
}
  