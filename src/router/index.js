import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1 .
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: '文档',
  //       meta: { title: '文档', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: '引导页',
  //       meta: { title: '引导页', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/masterData',
    component: Layout,
    redirect: '/masterData/supplierManagement',
    alwaysShow: true, // will always show the root menu
    name: '主数据',
    meta: {
      title: '主数据',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'supplierManagement',
        component: () => import('@/views/masterData/supplierManagement'),
        name: '供应商管理',
        meta: {
          title: '供应商管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'supplierManagementdelt',
        component: () => import('@/views/masterData/supplierManagementdelt'),
        name: '添加供应商',
        meta: {
          title: '添加供应商',
          roles: ['admin'] // or you can only set roles in sub nav
        },
        hidden: true
      },
      {
        path: 'partsManagement',
        component: () => import('@/views/masterData/partsManagement'),
        name: '零件管理',
        meta: {
          title: '零件管理'
        }
      },
      {
        path: 'partsManagementDetl',
        component: () => import('@/views/masterData/partsManagementDetl'),
        name: '添加零件',
        hidden: true,
        meta: { title: '添加零件' }
      },
      {
        path: 'performanceEvaluationRules',
        component: () => import('@/views/masterData/performanceEvaluationRules'),
        name: '供应商绩效评价规则',
        meta: {
          title: '供应商绩效评价规则',
          roles: ['admin']
        }
      },
      {
        path: 'standardManagement',
        component: () => import('@/views/masterData/standardManagement'),
        name: '效验标准管理',
        meta: {
          title: '效验标准管理',
          roles: ['admin']
        }
      },
      {
        path: 'standardManagementDelt',
        component: () => import('@/views/masterData/standardManagementDelt'),
        name: '添加效验标准',
        hidden: true,
        meta: {
          title: '添加效验标准',
          roles: ['admin']
        }
      }

    ]
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/icMaterialManagement',
    component: Layout,
    redirect: '/icMaterialManagement/purchaseOrderMaent',
    name: '来料管理',
    meta: {
      title: '来料管理',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'purchaseOrderMaent',
        component: () => import('@/views/icMaterialManagement/purchaseOrderMaent'),
        name: '采购单管理',
        meta: { title: '采购单管理', icon: 'edit' }
      },
      {
        path: 'purchaseOrderMaentDetl',
        component: () => import('@/views/icMaterialManagement/purchaseOrderMaentDetl'),
        name: '添加采购单',
        meta: { title: '添加采购单', noCache: true, activeMenu: '/icMaterialManagement/purchaseOrderMaent' },
        hidden: true
      },
      {
        path: 'inspectionManagement',
        component: () => import('@/views/icMaterialManagement/inspectionManagement'),
        name: '来料检验管理',
        meta: { title: '来料检验管理', icon: 'list' }
      },
      {
        path: 'inspectionManagementDetl',
        component: () => import('@/views/icMaterialManagement/inspectionManagementDetl'),
        name: '添加来料检验单',
        meta: { title: '添加来料检验单', noCache: true, activeMenu: '/icMaterialManagement/inspectionManagement' },
        hidden: true
      },

      {
        path: 'noReviewManagement',
        component: () => import('@/views/icMaterialManagement/noReviewManagement'),
        name: '不合格评审单管理',
        meta: { title: '不合格评审单管理', icon: 'list' }
      },
      {
        path: 'noReviewManagementDetl',
        component: () => import('@/views/icMaterialManagement/noReviewManagementDetl'),
        name: '不合格评审单详情',
        meta: { title: '不合格评审单详情', icon: 'list' , activeMenu: '/icMaterialManagement/noReviewManagement'},
        hidden: true
      },
    ]
  },

  {
    path: '/complaintManagement',
    redirect: '/icMaterialManagement/complaintFormManagement',
    component: Layout,
    name: '投诉管理',
    meta: {
      title: '投诉管理',
      icon: 'el-icon-s-help'
    },
    alwaysShow: true,
    children: [
      {
        path: 'complaintFormManagement',
        component: () => import('@/views/complaintManagement/complaintFormManagement'),
        name: '投诉单管理',
        meta: { title: '投诉单管理', icon: 'tab' }
      },
      {
        path: 'complaintFormManagementDetl',
        component: () => import('@/views/complaintManagement/complaintFormManagementDetl'),
        name: '添加投诉单',
        meta: { title: '添加投诉单', icon: 'list' , activeMenu: '/complaintManagement/complaintFormManagement'},
        hidden: true
      }
    ]
  },

  {
    path: '/systemManagement',
    component: Layout,
    redirect: '/systemManagement/qualificationManagement',
    name: '体系管理',
    meta: {
      title: '体系管理',
      icon: '404'
    },
    children: [
      {
        path: 'qualificationManagement',
        component: () => import('@/views/systemManagement/qualificationManagement'),
        name: '资质管理',
        meta: { title: '资质管理', noCache: true }
      },
      {
        path: 'qualificationManagementDelt',
        component: () => import('@/views/systemManagement/qualificationManagementDelt'),
        name: '供应商详情',
        meta: { title: '供应商详情', icon: 'list' , activeMenu: '/systemManagement/qualificationManagement'},
        hidden: true
      },
      
      {
        path: '404',
        component: () => import('@/views/table/complex-table'),
        name: '年度审核计划',
        meta: { title: '年度审核计划', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    alwaysShow: true,
    name: '文件管理',
    meta: { title: '文件管理', noCache: true, icon: 'bug' },

    children: [
      {
        path: 'log',
        component: () => import('@/views/table/complex-table'),
        name: '文件任务管理',
        meta: { title: '文件任务管理', icon: 'bug' }
      },
      {
        path: 'log1',
        component: () => import('@/views/table/complex-table'),
        name: '文件列表',
        meta: { title: '文件列表', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: '统计分析',
    meta: {
      title: '统计分析',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/table/complex-table'),
        name: '来料不良汇总',
        meta: { title: '来料不良汇总' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/table/complex-table'),
        name: '供应商来料批合格率统计',
        meta: { title: '供应商来料批合格率统计' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/table/complex-table'),
        name: '投诉处理及时性',
        meta: { title: '投诉处理及时性' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/table/complex-table'),
        name: '供应商业绩评价',
        meta: { title: '供应商业绩评价' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: '系统配置',
    meta: { title: '系统配置', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/table/complex-table'),
        name: '定时任务',
        meta: { title: '定时任务' }
      },
      {
        path: 'download',
        component: () => import('@/views/table/complex-table'),
        name: '操作日志',
        meta: { title: '操作日志' }
      },
      {
        path: 'download',
        component: () => import('@/views/table/complex-table'),
        name: '登录日志',
        meta: { title: '登录日志' }
      },
      {
        path: 'download',
        component: () => import('@/views/table/complex-table'),
        name: '字典管理',
        meta: { title: '字典管理' }
      }
    ]
  },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
