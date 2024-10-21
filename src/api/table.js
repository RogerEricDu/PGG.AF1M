// 封装所有和用户相关的接口函数
import request from '@/utils/request'

export function getAllIndividualData(data) {
  return request({
    url: '/table/allIndividual',
    method: 'post',
    data
  })
}

export function getByProvinceData(data) {
  return request({
    url: '/table/byProvince',
    method: 'post',
    data
  })
}

export function getByRegionData(data) {
  return request({
    url: '/table/byRegion',
    method: 'post',
    data
  })
}

