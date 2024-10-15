// 封装所有和用户相关的接口函数
import request from '@/utils/request'

export function getTableData(data) {
  return request({
    url: '/table/data',
    method: 'post',
    data
  })
}
