import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/bpm/variableDict/getList',
    method: 'post',
    data
  })
}

export function insertVarDict(data) {
  return request({
    url: '/bpm/variableDict/insert',
    method: 'post',
    data
  })
}

export function updateVarDict(data) {
  return request({
    url: '/bpm/variableDict/update',
    method: 'post',
    data
  })
}

export function deleteVarDict(data) {
  return request({
    url: '/bpm/variableDict/delete',
    method: 'post',
    data
  })
}
