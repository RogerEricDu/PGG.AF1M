// 封装所有和用户相关的接口函数
import request from '@/utils/request'

//获取单个SNP的详细数据
export function getFurtherInfoData(data) {
    return request({
        url: '/select/getFurtherInfoData',
        method: 'post',
        data
    })
}

export function getProvincialPopulation(data) {
    return request({
        url: '/select/getProvincialPopulation',
        method: 'post',
        data
    })
}

export function getGeneticSubgroups(data) {
    return request({
        url: '/select/getGeneticSubgroups',
        method: 'post',
        data
    })
}

//igvtools,传递一个染色体、染色体位置
export function getVariantBrowser(data) {
    return request({
        url: '/select/getVariantBrowser',
        method: 'post',
        data
    })
}

export function getVariantEffect(data) {
    return request({
        url: '/select/getVariantEffect',
        method: 'post',
        data
    })
}
//功能注释 nature selection
export function getFstData(data) {
    return request({
        url: '/select/getFstData',
        method: 'post',
        data
    })
}
export function getIhsData(data) {
    return request({
        url: '/select/getIhsData',
        method: 'post',
        data
    })
}
export function getTajimaData(data) {
    return request({
        url: '/select/getTajimaData',
        method: 'post',
        data
    })
}