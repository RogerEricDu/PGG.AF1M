// 封装所有和用户相关的接口函数
import request from '@/utils/request'

export function getAllIndividualData(data) {
  return request({
    url: '/select/individualSNP',
    method: 'post',
    data
  })
}

export function getAllIndividualDataMerge(data) {
  return request({
    url: '/select/individualMergeSNP',
    method: 'post',
    data
  })
}

export function getByProvinceData(data) {
  return request({
    url: '/select/provinceSNP',
    method: 'post',
    data
  })
}

export function getByProvinceDataMerge(data) {
  return request({
    url: '/select/provinceMergeSNP',
    method: 'post',
    data
  })
}

export function getByRegionData(data) {
  return request({
    url: '/select/regionSNP',
    method: 'post',
    data,
  })
}

export function getByRegionDataMerge(data) {
  return request({
    url: '/select/regionMergeSNP',
    method: 'post',
    data
  })
}