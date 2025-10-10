// 封装所有和用户相关的接口函数
import request from '@/utils/request'


//TGS数据使用的接口
export function getAllIndividualDataTGS(data) {
  return request({
    url: '/select/TGS/individualSNP',
    method: 'post',
    data
  })
}

export function getAllIndividualDataMergeTGS(data) {
  return request({
    url: '/select/TGS/individualMergeSNP',
    method: 'post',
    data
  })
}

export function getByProvinceDataTGS(data) {
  return request({
    url: '/select/TGS/provinceSNP',
    method: 'post',
    data
  })
}

export function getByProvinceDataMergeTGS(data) {
  return request({
    url: '/select/TGS/provinceMergeSNP',
    method: 'post',
    data
  })
}

export function getByRegionDataTGS(data) {
  return request({
    url: '/select/TGS/regionSNP',
    method: 'post',
    data,
  })
}

export function getByRegionDataMergeTGS(data) {
  return request({
    url: '/select/TGS/regionMergeSNP',
    method: 'post',
    data
  })
}

export function getByPopulationDataTGS(data) {
  return request({
    url: '/select/TGS/populationSNP',
    method: 'post',
    data,
  })
}

export function getByPopulationDataMergeTGS(data) {
  return request({
    url: '/select/TGS/populationMergeSNP',
    method: 'post',
    data
  })
}


//NGS数据使用的接口
export function getAllIndividualData(data) {
  return request({
    url: '/select/NGS/individualSNP',
    method: 'post',
    data
  })
}

export function getAllIndividualDataMerge(data) {
  return request({
    url: '/select/NGS/individualMergeSNP',
    method: 'post',
    data
  })
}

export function getByProvinceData(data) {
  return request({
    url: '/select/NGS/provinceSNP',
    method: 'post',
    data
  })
}

export function getByProvinceDataMerge(data) {
  return request({
    url: '/select/NGS/provinceMergeSNP',
    method: 'post',
    data
  })
}

export function getByRegionData(data) {
  return request({
    url: '/select/NGS/regionSNP',
    method: 'post',
    data,
  })
}

export function getByRegionDataMerge(data) {
  return request({
    url: '/select/NGS/regionMergeSNP',
    method: 'post',
    data
  })
}

export function getByPopulationData(data) {
  return request({
    url: '/select/NGS/populationSNP',
    method: 'post',
    data,
  })
}

export function getByPopulationDataMerge(data) {
  return request({
    url: '/select/NGS/populationMergeSNP',
    method: 'post',
    data
  })
}

//下面的都是芯片数据的接口，和NGS的进行区分

export function getAllIndividualDataMicroarray(data) {
  return request({
    url: '/select/Microarray/individualSNP',
    method: 'post',
    data
  })
}

export function getAllIndividualDataMergeMicroarray(data) {
  return request({
    url: '/select/Microarray/individualMergeSNP',
    method: 'post',
    data
  })
}
