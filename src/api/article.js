import request from '@/utils/request'

// 供应商管理
export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}
// 零件管理
export function partsManagementList(query) {
  return request({
    url: '/vue-element-admin/article/partsManagementList',
    method: 'get',
    params: query
  })
}
// 效验标准管理
export function standardManagementList(query) {
  return request({
    url: '/vue-element-admin/article/standardManagementList',
    method: 'get',
    params: query
  })
}
// 采购单管理
export function purchaseOrderMaentList(query) {
  return request({
    url: '/vue-element-admin/article/purchaseOrderMaentList',
    method: 'get',
    params: query
  })
}
// 采购单管理
export function inspectionManagementList(query) {
  return request({
    url: '/vue-element-admin/article/inspectionManagementList',
    method: 'get',
    params: query
  })
}
export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
