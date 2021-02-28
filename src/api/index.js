import * as baseUrl from './baserUrl'
import { httpReq } from '@/utils/axios_config'
import { Message, MessageBox } from 'element-ui'
// import { saveAs } from 'file-saver'

/**
 * 获取列表信息
 * @param {Object} search 条件域的查询参数
 * @param {Object} pageTot 分页的配置数据
 * @param {String} searchUrl 查询请求的url地址
 * @param {Boolean} isStringfy 是否将参数转成字符串
 * @returns {Object} Promise形式返回的请求结果
 */
export function httpGetList(search, pageTot, searchUrl, isStringfy) {
  const searchParams = {}
  for (const [key, value] of Object.entries(search)) {
    if (value && value !== '') {
      searchParams[key] = value instanceof Array ? value.join(',') : value
    }
  }
  const pageParams = {
    currentPage: isStringfy ? pageTot.pageNum.toString() : pageTot.pageNum,
    pageSize: isStringfy ? pageTot.pageSize.toString() : pageTot.pageSize
  }
  const resultParams = isStringfy ? {
    dataStr: JSON.stringify(Object.assign(pageParams, searchParams)),
    timeStamp: +new Date()
  } : Object.assign(pageParams, searchParams)
  return httpReq({
    url: baseUrl[searchUrl],
    method: 'get',
    params: resultParams
  })
}

/**
 * 删除请求 (调用时默认会开启整个contentBox区域的加载动画)
 * @param {String} delMethod 删除数据的请求是Get还是Post
 * @param {Object} delParams 请求参数
 * @param {String} delUrl 删除请求的url地址
 * @param {String|Array} name 要删除对象的名称(用于提示)
 * @returns {Object} Promise形式返回的请求结果
 */
export function httpDelete(delMethod, delParams, delUrl, name) {
  let targetName = '选定的记录'
  if (name) {
    if (typeof (name) === 'string') { targetName = ` ${name} ` }
    if (name instanceof Array) {
      name.forEach(n => {
        targetName += ' ' + n + ','
      })
      targetName = targetName.replace(/,$/, ' ')
    }
  }
  return new Promise(function(resolve, reject) {
    MessageBox.confirm(`是否删除${targetName}?`, '提示', {
      confirmButtonText: '是', cancelButtonText: '否', type: 'warning'
    }).then(() => {
      if (delMethod.toLowerCase() !== 'get' && delMethod.toLowerCase() !== 'post') {
        console.log('参数delMethod不正确!')
      } else {
        let requestObj = null
        if (delMethod.toLowerCase() === 'get') {
          requestObj = {
            url: baseUrl[delUrl],
            params: delParams,
            setGLoad: true
          }
        } else {
          requestObj = {
            url: baseUrl[delUrl],
            method: 'post',
            data: delParams,
            setGLoad: true,
            isJSONParams: true// post删除默认采用json传参
          }
        }
        httpReq(requestObj).then(res => {
          // if (res.SUCCESS) {
          //   Message({ type: 'success', message: '删除成功!' })
          // }
          resolve(res)
        })
      }
    }).catch(() => {
    })
  })
}

/**
 * 从后端请求下载文件
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {String} filename 下载文件名 包括后缀名
 * @param {String} exportMethod 请求方法 默认为get请求
 * @returns {Object} 一个没有参数的Promise承诺
 */
export function httpExport(url, params, filename = '', exportMethod = 'get') {
  return httpReq({
    url: baseUrl[url],
    method: exportMethod === 'post' ? 'post' : 'get',
    [exportMethod === 'post' ? 'data' : 'params']: params,
    isJSONParams: exportMethod === 'post',
    responseType: 'arraybuffer'
  }).then(res => {
    if (res) {
      if (res.headers['content-type'] && res.headers['content-type'].indexOf('application/json') === -1) {
        const blob = new Blob([res.data], { type: res.headers['content-type'] })
        let resFilename = res.headers['filename']
        // saveAs(blob, filename || resFilename)
      } else {
        // 如果返回类似{SUCCESS:false,MSG:...}的错误对象则走这里
        // 参考https://segmentfault.com/q/1010000014569305
        const decodedString = String.fromCharCode.apply(null, new Uint8Array(res.data))
        const resObj = JSON.parse(decodedString)
        if (resObj.MSG) {
          Message({ message: resObj.MSG, type: 'warning' })
        }
      }
    }
  })
}
export function httpGetLink(url, params, setGLoad = false, timeoutH = false) {
  return httpReq({
    url: url,
    params: { timeStamp: +new Date(), ...params },
    setGLoad: setGLoad,
    timeoutH: timeoutH
  })
}
/**
 * get请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {Boolean} setGLoad 请求时是否开启整个内容区的加载动画
 * @returns {Object} Promise形式返回的请求结果
 */
export function httpGet(url, params = {}, setGLoad = false, timeoutH = false, urlType = '') {
  return httpReq({
    url: baseUrl[url],
    params: { timeStamp: +new Date(), ...params },
    setGLoad,
    timeoutH,
    urlType
  })
}

/**
 * post请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Boolean} setGLoad 请求时是否开启整个内容区的加载动画
 * @param {Boolean} formData 是否进行参数序列化,默认不序列化
 * @param {Boolean} jsonParams json格式传参还是formdata传参,默认json格式
 * @returns {Object} Promise形式返回的请求结果
 */
export function httpPost(url, data = {}, setGLoad = false, formData = undefined, jsonParams = true, urlType = '') {
  return httpReq({
    method: 'post',
    url: baseUrl[url],
    data,
    setGLoad,
    formData,
    isJSONParams: jsonParams,
    urlType
  })
}
