import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/bpm/processDetail/getList',
    method: 'post',
    data
  })
}

export function insertOrUpdate(data) {
  return request({
    url: '/bpm/processDetail/insertOrUpdate',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/bpm/processDetail/insertOrUpdate',
    method: 'post',
    data
  })
}

export function deleteProcessDetail(data) {
  return request({
    url: '/bpm/processDetail/delete',
    method: 'post',
    data
  })
}

export function publish(data) {
  return request({
    url: '/bpm/processDetail/publish',
    method: 'post',
    data
  })
}

export function updateDefaultVersion(processId, processDetailId) {
  return request({
    url: '/bpm/processDetail/updateDefaultVersion/' + processId + '/' + processDetailId,
    method: 'post'
  })
}

export function getProcessDetailById(processDetailId) {
  return request({
    // url: '/bpm/processDetail/getProcessDetailById/' + processDetailId,
    url: '/processDetail/getProcessDetailById.jsp',
    method: 'post'
  })
}

