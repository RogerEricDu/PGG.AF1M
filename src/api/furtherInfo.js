// 封装所有和用户相关的接口函数
import request from '@/utils/request'


export function getProvincialPopulation(data) {
    return request({
        url: '/furtherInfo/provincialPopulation',
        method: 'post',
        data
    })
}

export function getGeneticSubgroups(data) {
    return request({
        url: '/furtherInfo/geneticSubgroups',
        method: 'post',
        data
    })
}

//igvtools,传递一个染色体、染色体位置
export function getVariantBrowser(data) {
    return request({
        url: '/furtherInfo/variantBrowser',
        method: 'post',
        data
    })
}

export function getVariantEffect(data) {
    return request({
        url: '/vep/annotate',
        method: 'post',
        data
    })
}

//功能注释 nature selection
export function getFstData(data) {
    return request({
        url: '/furtherInfo/fstData',
        method: 'post',
        data
    })
}
export function getIhsData(data) {
    return request({
        url: '/furtherInfo/ihsData',
        method: 'post',
        data
    })
}
export function getTajimaData(data) {
    return request({
        url: '/furtherInfo/tajimaData',
        method: 'post',
        data
    })
}