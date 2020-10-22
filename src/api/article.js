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
// 来料管理管理
export function inspectionManagementList(query) {
  return request({
    url: '/vue-element-admin/article/inspectionManagementList',
    method: 'get',
    params: query
  })
}
// 不合格评审单管理
export function noReviewManagementList(query) {
  return request({
    url: '/vue-element-admin/article/noReviewManagementList',
    method: 'get',
    params: query
  })
}
// 投诉单管理
export function complaintFormManagementList(query) {
  return request({
    url: '/vue-element-admin/article/complaintFormManagementList',
    method: 'get',
    params: query
  })
}
// 资质管理
export function qualificationManagementList(query) {
  return request({
    url: '/vue-element-admin/article/qualificationManagementList',
    method: 'get',
    params: query
  })
}
// 年度审核计划
export function annualAuditPlanList(query) {
  return request({
    url: '/vue-element-admin/article/annualAuditPlanList',
    method: 'get',
    params: query
  })
}
// 文件任务管理
export function fileTaskManagementList(query) {
  return request({
    url: '/vue-element-admin/article/fileTaskManagementList',
    method: 'get',
    params: query
  })
}
// 文件列表
export function fileList(query) {
  return request({
    url: '/vue-element-admin/article/fileList',
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
