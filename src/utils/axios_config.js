// import cookie from '@/utils/cookie.js'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
// import router from '../router'
import Qs from 'qs'
import app from '../main'
const axiosIns = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

// 短时间内多次提示要重新登录的话只走一遍相关代码
let reLoginCount = 0

export const pending = [] // 取消请求相关
const CancelToken = axios.CancelToken
// const removePending = (configStr) => {
//   for (let i = 0, len = pending.length; i < len; i++) {
//     if (pending[i].u === configStr) {
//       pending[i].f()
//       pending.splice(i, 1)
//       break
//     }
//   }
// }

// request请求拦截器
axiosIns.interceptors.request.use(config => {
  const realParam = config.method === 'get' ? JSON.stringify(config.params) : JSON.stringify(config.data)
  const realConfig = config.baseURL + config.url + '&' + config.method + '&' + realParam
  // removePending(realConfig);
  config.cancelToken = new CancelToken(c => {
    pending.push({
      u: realConfig,
      f: c
    })
  })

  app.$Progress.start()// 开始进度条
  if (store.getters.token) {
    config.headers.common['x-auth-token'] = store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  app.$Progress.fail() // 结束进度条
  return Promise.reject(error)
})

// response响应拦截器
axiosIns.interceptors.response.use(response => {
  // const realParam = response.config.method=='get' ? JSON.stringify(response.config.params) : JSON.stringify(response.config.data);
  // const realConfig = response.config.url+'&'+response.config.method+'&'+realParam;
  // removePending(realConfig);
  /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
  const res = response.data
  // 如果是获取验证码请求，并且请求成功
  if (res.SUCCESS && response.headers['x-auth-token'] && response.config.url.indexOf('createValidateCode.action') !== -1) {
    // cookie.setCookies('TOKEN', response.headers['x-auth-token'])
    store.commit('SET_TOKEN', response.headers['x-auth-token'])
  }

  // 如果登录成功则重置reLoginCount
  if (res.SUCCESS && response.config.url.indexOf('login.action') !== -1) {
    reLoginCount = 0
  }

  // 如果success为0
  if (!res.SUCCESS) {
    // 如果回话超时或者非正常登录
    if (res.type === 'invalidSession' || res.type === 'noLogin') {
      if (++reLoginCount === 1) {
        store.commit('SET_TOKEN', '')
        MessageBox.alert(res.MSG, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          showClose: false,
          closeOnHashChange: false,
          type: 'warning'
        }).then(() => {
          // router.push(`/login?redirect=${router.currentRoute.fullPath}`)
        })
        // if(router.currentRoute.matched.length == 0){
        //   router.push({ path: '/login' })
        // }else{
        //   // store.commit('SET_SHOWLOG',true);
        //   router.push({ path: '/login' })
        // }
      }
    } else {
      if (res.MSG) {
        Message({ message: res.MSG, type: 'error' })
      }
    }
  }
  // 如果responseType为arraybuffer，则会返回整个response对象
  if (response.config.responseType === 'arraybuffer') {
    app.$Progress.finish() // 结束进度条
    return response
  } else {
    app.$Progress.finish() // 结束进度条
    return response.data
  }
}, error => {
  // canceled时会走到这里,error为Cancel{message:undefined}
  if (error && error.response) {
    const statusMsg = {
      message: '',
      type: 'error',
      duration: 5 * 1000
    }
    switch (error.response.status) {
      case 400:
        statusMsg.message = '请求错误，请稍后再试！'
        break
      case 401:
        statusMsg.message = '未授权，请登录'
        break
      case 403:
        statusMsg.message = '拒绝访问，请稍后再试！'
        break
      case 404:
        statusMsg.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        statusMsg.message = '请求超时，请稍后再试！'
        break
      case 500:
        statusMsg.message = '服务器繁忙，请稍后再试！'
        break
      case 501:
        statusMsg.message = '服务未实现'
        break
      case 502:
        statusMsg.message = '网关错误，请稍后再试！'
        break
      case 503:
        statusMsg.message = '服务不可用'
        break
      case 504:
        statusMsg.message = '网关超时，请稍后再试！'
        break
      case 505:
        statusMsg.message = 'HTTP版本不受支持'
        break
      default:
    }
    Message(statusMsg)
  }
  app.$Progress.fail() // 错误进度条
  return Promise.reject(error)
})
export function httpReq(settings) {
  let httpTime = 15000;
  if(settings.timeoutH){
    httpTime = 60000;
  }else if(settings.formData){
    httpTime = 0;
  }
  // let httpUrl = process.env.VUE_APP_BASE_URL;
  // if(settings.urlType == 'sh'){
  //   httpUrl = process.env.VUE_APP_SH_URL;
  // }
  const resultSettings = {
    // baseURL: httpUrl,
    timeout: httpTime,
    ...settings
  }
  const httpMethod = settings.method
  if (httpMethod === 'post') {
    /** 根据formData和isJSONParams决定是否将参数序列化
     * qs.parse()将URL解析成对象的形式
     * qs.stringify()将对象解析成URL的形式
     */
    if (resultSettings.isJSONParams !== true && resultSettings.formData !== true) {
      resultSettings.transformRequest = [function(data) {
        data = Qs.stringify(data, { arrayFormat: 'indices', allowDots: true })
        return data
      }]
    }
    /** 根据isJSONParams决定传参方式是JSON还是FormData
     * 为true:JSON,为false:FormData
     */
    if (settings.isJSONParams) {
      resultSettings.headers = { 'Content-Type': 'application/json;charset=UTF-8' }
    } else {
      resultSettings.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    }
  }

  settings.setGLoad && store.commit('SET_GLOBALLOADING', true) // contentBox全局加载动画

  // 没有reject 因为希望所有错误都在本文件内处理
  return new Promise(function(resolve, reject) {
    axiosIns.request(resultSettings).then((response) => {
      settings.setGLoad && store.commit('SET_GLOBALLOADING', false)
      resolve(response)
    }).catch((error) => {
      //  1.判断请求超时
      if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        Message({ message: '请求超时，请稍后再试！', type: 'error', duration: 5 * 1000 })
      }
      settings.setGLoad && store.commit('SET_GLOBALLOADING', false)
      if (settings.responseType === 'arraybuffer') {
        resolve()
      } else {
        resolve({ SUCCESS: false })
      }
    })
  })
}
