const Mock = require('mockjs');
const jsonObj = require('../src/views/masterData/json')
const jsonObj1 = require('../src/views/icMaterialManagement/json')
const jsonObj2 = require('../src/views/complaintManagement/json')
const jsonObj3 = require('../src/views/systemManagement/json')
// import defaultSettings from '@/settings';
// 主数据
const List = jsonObj.supMent.rows
const partsManagementList = jsonObj.partsManagement.rows
const standardManagementList = jsonObj.standardManagement.rows
// 来料管理
const purchaseOrderMaentList = jsonObj1.purchaseOrderMaent.rows
const inspectionManagementList = jsonObj1.inspectionManagement.rows
const noReviewManagementList = jsonObj1.noReviewManagement.rows
// 投诉管理
const complaintFormManagementList = jsonObj2.complaintFormManagement.rows
// 体系管理
const qualificationManagementList = jsonObj3.qualificationManagement.rows

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     id: '@increment',
//     timestamp: +Mock.Random.date('T'),
//     author: '@first',
//     reviewer: '@first',
//     title: '@title(5, 10)',
//     content_short: 'mock data',
//     content: baseContent,
//     forecast: '@float(0, 100, 2, 2)',
//     importance: '@integer(1, 3)',
//     'type|1': ['CN', 'US', 'JP', 'EU'],
//     'status|1': ['published', 'draft'],
//     display_time: '@datetime',
//     comment_disabled: true,
//     pageviews: '@integer(300, 5000)',
//     image_uri,
//     platforms: ['a-platform']
//   }))
// }

module.exports = [
  // 供应商管理
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { supplierNo, supplierName, supplierType, supplierLevel, state, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (supplierType && item.supplierType != supplierType) return false
        if (supplierLevel && item.supplierLevel != supplierLevel) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //零件管理列表
  {
    url: '/vue-element-admin/article/partsManagementList',
    type: 'get',
    response: config => {
      const { partNo, partName, specification, partType, state, page = 1, limit = 20, sort } = config.query
      let mockList = partsManagementList.filter(item => {
        if (partNo && item.partNo.indexOf(partNo) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (partType && item.partType != partType) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //效验标准管理
  {
    url: '/vue-element-admin/article/standardManagementList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = standardManagementList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //采购单管理
  {
    url: '/vue-element-admin/article/purchaseOrderMaentList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = purchaseOrderMaentList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //来料检验管理
  {
    url: '/vue-element-admin/article/inspectionManagementList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = inspectionManagementList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //不合格评审管理
  {
    url: '/vue-element-admin/article/noReviewManagementList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = noReviewManagementList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //投诉单管理
  {
    url: '/vue-element-admin/article/complaintFormManagementList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = complaintFormManagementList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  //资质管理管理
  {
    url: '/vue-element-admin/article/qualificationManagementList',
    type: 'get',
    response: config => {
      const { standardNo, supplierNo, supplierName, partName, specification, state, page = 1, limit = 20, sort } = config.query
      let mockList = qualificationManagementList.filter(item => {
        if (standardNo && item.standardNo.indexOf(standardNo) < 0) return false
        if (supplierNo && item.supplierNo.indexOf(supplierNo) < 0) return false
        if (supplierName && item.supplierName.indexOf(supplierName) < 0) return false
        if (partName && item.partName.indexOf(partName) < 0) return false
        if (specification && item.specification.indexOf(specification) < 0) return false
        if (state && item.state != state) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  
  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.supplierId === +supplierId) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

