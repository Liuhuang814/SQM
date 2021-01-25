import request from '@/utils/request'

export function getList(data) {
    return request({
        url: '/bpm/dict/getList',
        method: 'post',
        data
    })
}

export function insertOrUpdateDict(data) {
    return request({
        url: '/bpm/dict/insertOrUpdateDict',
        method: 'post',
        data
    })
}

export function deleteDict(data) {
    return request({
        url: '/bpm/dict/delete',
        method: 'post',
        data
    })
}

export function getDeptListByTenantId(data) {
    return request({
        url: '/bpm/dict/getDeptListByTenantId/' + data,
        method: 'post'
    })
}

export function getDictListByDictCode(data) {
    return request({
        //url: '/bpm/dict/getDictListByDictCode/' + data,
        url: '/dict/getDictListByDictCode.jsp',
        method: 'post'
    })
}

export function getRoleDict(data) {
    return request({
        //url: '/bpm/dict/getRoleDictByTenantId/' + data,
        url: '/dict/getRoleDictByTenantId.jsp',
        method: 'post'
    })
}

export function getRoleGroupDict(data) {
    return request({
        //url: '/bpm/dict/getRoleGroupDictByTenantId/' + data,
        url: '/dict/getRoleGroupDictByTenantId.jsp',
        method: 'post'
    })
}

export function getProcessDict(data) {
    return request({
        url: '/bpm/dict/getProcessDict/' + data,
        method: 'post'
    })
}
