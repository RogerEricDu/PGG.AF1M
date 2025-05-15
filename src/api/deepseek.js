// 封装所有和DeepSeek相关的接口函数
import request from '@/utils/request'

// SNP注释接口
export function annotateSnp(data) {
  return request({
    url: '/DeepSeek/annotateSnp',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 基因注释接口
export function annotateGene(data) {
  return request({
    url: '/DeepSeek/annotateGene',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 问答接口
export function askDeepSeek(data) {
  return request({
    url: '/DeepSeek/ask',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
