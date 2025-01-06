// 封装所有和用户相关的接口函数
import request from '@/utils/request'

//查询批量检索频率的文件状态
export function uploadFileStatus(data) {
    return request({
        url: '/tools/uploadFileStatus',
        method: 'post',
        data
    })
}
//批量检索频率信息用这个接口
export function selectUploadFile(data) {
    return request({
        url: '/tools/selectUploadFile',
        method: 'post',
        data
    })
}

//查询imputation的文件状态
export function uploadImputationStatus(data) {
    return request({
        url: '/tools/uploadImputationStatus',
        method: 'post',
        data
    })
}
//上传imputation用这个接口
export function selectImputationFile(data) {
    return request({
        url: '/tools/selectImputationFile',
        method: 'post',
        data
    })
}

//查询GWAS的文件状态
export function uploadGwasStatus(data) {
    return request({
        url: '/tools/uploadGwasStatus',
        method: 'post',
        data
    })
}
//上传GWAS用这个接口
export function selectGwasFile(data) {
    return request({
        url: '/tools/selectGwasFile',
        method: 'post',
        data
    })
}

//查询总体的文件状态
export function selectResult(data) {
    return request({
        url: '/tools/selectResult',
        method: 'post',
        data
    })
}
