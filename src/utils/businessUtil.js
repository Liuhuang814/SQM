/* eslint-disable */

/**
 * 业务帮助类
 */

/* 1.数据的转换，用在提交数据时，只提交修改过的字段。
   入参：oldData(原数据)，object类型
        newData(修改后的数据)，object类型
        callback(回调函数)，function类型，可以不传。
   返回：两个对象中不同的字段。
*/
export function getUpdatedData(oldData, newData, callback) {
  const resultParams = {}
  for (const [key, value] of Object.entries(oldData)) {
    if (value != newData[key]) {
      resultParams[key] = newData[key]
    }
  }
  if (callback && (typeof callback === 'function')) {
    return callback(resultParams)
  } else {
    return resultParams
  }
}

/* 2.根据表格高度，自动计算出表格显示数据的最佳行数。
    入参：tableHeight(el-table表格高度)
    返回：pageSize(每页显示条数数组),pageSize[0]:表格显示数据的最佳行数
*/
export function getTableBestRows(tableHeight, hasInnerRowComp = '') {
  // tableHeight不包含表格底部的分页和页数高度,表头高度：tableRowHeight,表格不换行的行高：tableRowHeight
  let tableRowHeight = 35
  // switch (defaultSettings.elementSize) {
  //   case 'mini':
  //     tableRowHeight = 36
  //     break
  //   case 'small':
  //     tableRowHeight = 40
  //     break
  //   case 'medium':
  //     tableRowHeight = 44
  //     break
  //   default:
  //     tableRowHeight = 48
  //     break
  // }

  // 默认只考虑表格的行内组件尺寸都是mini的情况
  if(hasInnerRowComp === 'textButton') {
    tableRowHeight += 9 // 考虑行内有文本按钮的情况
  } else if(hasInnerRowComp === 'normal') {
    tableRowHeight += 5 // 考虑行内有普通输入框or下拉框等组件的情况
  }

  // 为了避免边界条件额外减2
  let bestRows = Number.parseInt((tableHeight - tableRowHeight - 2) / tableRowHeight)
  // 避免负数
  bestRows = bestRows > 0 ? bestRows : 1
  const pageSize = [bestRows]
  let i = bestRows + 10
  do {
    if (i % 5 == 0) {
      pageSize.push(i)
    }
    i++
  }
  while (pageSize.length < 5)

  return pageSize
}

/*
  3.根据页面配置文件，生成字段校验
  入参:settings,Array类型
  返回：{rules,selectKeys},rules是生成表单校验的规则，selectKeys是下拉列表需要加载的数据。
*/
export function cerateValidator(pageData) {
  const elementValidators = ['null', 'date', 'array']
  let rules = {}, selectKeys = [], scene = pageData.scene
  switch (scene) {
    case 'collapse':
    case 'simpleForm':
      pageData.settings.forEach(setting => {
        const collapseName = setting.name
        setting.items && setting.items.forEach(item => {
          const rule = []
          item.validator && item.validator.forEach(validate => {
            const valid = { trigger: validate.trigger, message: validate.message }
            // 非自定义校验
            if (elementValidators.includes(validate.function)) {
              validate.function != 'null' && Reflect.set(valid, 'type', validate.function)
            } else { // 自定义校验
              Reflect.set(valid, 'validator', Validators[validate.function])
            }
            item.required && Reflect.set(valid, 'required', true)
            scene == 'collapse' && Reflect.set(valid, 'panel', collapseName)
            rule.push(valid)
          })

          rule.length > 0 && Reflect.set(rules, item.model, rule)
          if (item.type == 'select' || item.type == 'cascader' || item.type == 'multipleSelect') {
            selectKeys.push(item.data)
          }
        })
      })
      break
  }
  const result = { rules: rules }
  if (selectKeys.length > 0) {
    Reflect.set(result, 'selectKeys', selectKeys.join(','))
  }
  return result
}

/*
校验
*/
export const Validators = {
  checkNull(rule, value, callback) {
    if (value == '' || value == null) {
      callback(new Error('该字段为必填字段'))
    } else {
      callback()
    }
  },
  // 大于等于0的整数
  checkIntGreaterZero(rule, value, callback) {
    var reg = /^([0-9]\d*|[0]{1,1})$/ // 含0正整数
    if (typeof value === 'number' || value == undefined) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入>=0的整数'))
      } else {
        callback()
      }
    }
  },
  checkNumber(rule, value, callback) {
    const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/ig
    if (!reg.test(value)) {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  },
  checkEnglish(rule, value, callback) {
    var reg = /^[A-Za-z]+$/
    if (!reg.test(value)) {
      callback(new Error('请输入英文字母'))
    } else {
      callback()
    }
  },
  // 电子邮箱
  checkEmail(rule, value, callback) {
    const reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
    if (!!value && !reg.test(value)) {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  },
  // 邮政编码
  checkPostCode(rule, value, callback) {
    const reg = /[1-9]\d{5}(?!\d)/
    if (!!value && !reg.test(value)) {
      callback(new Error('请输入正确的邮政编码'))
    } else {
      callback()
    }
  },
  // 电话号(包括手机号和座机)
  checkPhone(rule, value, callback) {
    const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$|^(\d{3,4}-)?\d{7,8}$/
    if (!!value && !reg.test(value)) {
      callback(new Error('请输入正确的电话号'))
    } else {
      callback()
    }
  },
  // 身份证件号码
  checkIdCard(rule, value, callback) {
    const reg15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/// 15位
    const reg18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/// 18位
    if (!!value && !reg15.test(value) && !reg18.test(value)) {
      callback(new Error('请输入正确的身份证件号码'))
    } else {
      callback()
    }
  }
}

/*
    计算当前学年学期
*/
export function getCurrentYearTerm(yearKey, termKey) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const returnResult = {}
  if (yearKey && termKey) {
    Reflect.set(returnResult, yearKey, month >= 3 && month <= 8 ? year - 1 : year)
    Reflect.set(returnResult, termKey, month >= 3 && month <= 8 ? '2' : '1')
  } else {
    Reflect.set(returnResult, 'a.xn01', month >= 3 && month <= 8 ? year - 1 : year)
    Reflect.set(returnResult, 'a.xq01', month >= 3 && month <= 8 ? '2' : '1')
  }
  return returnResult
}

/**
 *打开一个标签页
  参数: path ：跳转路由  string
        query ：携带参数  Object
 */
// 用户记录所有打开的子窗口
var win_Array = []
var win_num = -1
export function openPage(path, query) {
  const fullPath = location.href
  const subPath = fullPath.substring(0, fullPath.lastIndexOf('/') + 1)
  const queryParams = []
  for (const [key, value] of Object.entries(query)) {
    queryParams.push(`${key}=${value}`)
  }
  win_num = win_num + 1
  win_Array[win_num] = window.open(`${subPath}${path}?${queryParams.join('&')}`)
}

export function closePage() {
  if (win_Array.length > 0) {
    for (var i = 0, len = win_Array.length; i <= len; i++) {
      var win_one = win_Array[i]
      if (win_one != undefined) {
        win_one.close()
      }
    }
  }
}
// 获取参数
export function getParam(name, url) {
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
  var regexS = '[\\?&]' + name + '=([^&#]*)'
  var regex = new RegExp(regexS)
  var results = regex.exec(url)
  if (results == null) { return '' } else { return results[1] }
}

/* 7.压缩图片。
   入参：fileObj(原数据)，object类型,
        callback(回调函数)，function类型，可以不传。
*/
export function compressImage(imgStr, callback) {
  try {
    const image = new Image()
    image.src = imgStr
    // image.src = URL.createObjectURL(fileObj)
    image.onload = function() {
      const that = this
      // 默认按比例压缩
      const w = that.width
      const h = that.height
      const scale = w / h
      // w = fileObj.width || w
      // h = fileObj.height || (w / scale)
      const quality = 0.4 // 默认图片质量为0.3
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // 图像质量
      // if (fileObj.quality && fileObj.quality <= 1 && fileObj.quality > 0) {
      //   quality = fileObj.quality
      // }
      // quality值越小，所绘制出的图像越模糊
      const data = canvas.toDataURL('image/jpeg', quality)
      // 压缩完成执行回调
      callback(data)
    }
  } catch (e) {
    console.log('压缩失败!')
  }
}

// 将base64转换为文件
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// 获取当前使用浏览器
export function getExplorer() {
  var explorer = window.navigator.userAgent
  // ie
  if (explorer.indexOf('MSIE') >= 0) { return 'ie' }
  // firefox
  else if (explorer.indexOf('Firefox') >= 0) { return 'Firefox' }
  // Chrome
  else if (explorer.indexOf('Chrome') >= 0) { return 'Chrome' }
  // Opera
  else if (explorer.indexOf('Opera') >= 0) { return 'Opera' }
  // Safari
  else if (explorer.indexOf('Safari') >= 0) { return 'Safari' }
}

// 给列表数据加序号
export function addIndex(tableData, currentPage, pageSize) {
  for (let i = 0; i < tableData.length; i++) {
    tableData[i].xh = (currentPage - 1) * pageSize + (i + 1)
  }
}

// 树形结构数组过滤(不保留父节点但保留子节点)
export function treeFilter(menu, childrenKey, key, value, resultTree) {
  menu.forEach(item => {
    if (item[key].includes(value)) {
      resultTree.push(item)
    } else {
      if (item[childrenKey]) {
        treeFilter(item[childrenKey], childrenKey, key, value, resultTree)
      }
    }
  })
}

// 对象数组深拷贝
export function deepArrayCopy(source) {
  if (source instanceof Array) {
    var n = []
    for (var i = 0; i < source.length; ++i) {
      n[i] = deepArrayCopy(source[i])
    }
    return n
  } else if (source instanceof Object) {
    var n = {}
    for (var i in source) {
      n[i] = deepArrayCopy(source[i])
    }
    return n
  } else {
    return source
  }
}

// 设置一个有条件的间歇调用定时器
export function setIfInterval(conditionFn, nextFn, interval = 150) {
  let count = 0 //限制最多等待时间
  setTimeout(function cb() {
    if (conditionFn()) {
      nextFn()
    } else if(count++ < 20) {
      setTimeout(cb, interval)
    }
  }, interval)
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
