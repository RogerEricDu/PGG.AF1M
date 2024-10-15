// 封装所有和用户相关的接口函数
import request from '@/utils/request'

export function uploadText(data) {
    return request({
        url: '/tools/upload',
        method: 'post',
        data
    })
}