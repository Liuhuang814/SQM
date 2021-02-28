/** 模拟请求接口 sta*/

/** 模拟请求接口 end*/

// 学生报名界面通用接口 不走登录过滤
export const getDropListsStuBm = `/visitor/xsgl/zslq/onlineRegistration/getDropLists.action` // 获取下拉框选项(数据字典)
export const stuBmsave = `/visitor/xsgl/zslq/onlineRegistration/save.action` //保存报名
export const etParamValuesStuBmg = `/visitor/xsgl/zslq/onlineRegistration/getParamValues.action` //获取网上报名须知和招生年份
export const getSetInfoItemStuBmg = `/visitor/xsgl/zslq/onlineRegistration/getSetInfoItem.action` //查询已设置信息项
export const getSchoolName = `/visitor/xsgl/zslq/onlineRegistration/getSchoolName.action` //获取学校名称
export const getRecruitExamStuBmg = `/visitor/xsgl/zslq/onlineRegistration/getRecruitExamSubjectList.action` // 查询升学成绩

// 通用接口

export const getSchoolLogo = `/visitor/schoolLogo/get.action` // 获取LOGO
export const getDropLists = `/frame/droplist/getDropLists.action` // 获取下拉框选项(数据字典)
export const saveParamValues = `/frame/controlParam/saveParamValues.action` // 保存控制参数数据
export const getParamValues = `/frame/controlParam/getParamValues.action` // 依据参数名获取参数值
export const CLodop = `${process.env.VUE_APP_LOC_URL}/static/download/CLodop_Setup_for_Win32NT.exe` // 下载Lodop
export const CLodop32 = `${process.env.VUE_APP_LOC_URL}/static/download/install_lodop32.exe` // 下载Lodop32
export const CLodop64 = `${process.env.VUE_APP_LOC_URL}/static/download/install_lodop64.exe` // 下载Lodop64
export const getAreaText = `/jbxx/schoolinfo/getXzqhMc.action` // 获取地区的text
export const registerStudentRewardDown = `/file/download.action` // 下载文件


// 登录界面
export const VALIDATE_PICTRUE = `/picture/visitor/createValidateCode.action` // 获取验证码
export const USER_LOGIN = `/user/visitor/login.action` // 登录
export const USER_LOGOUT = `/user/logout.action` // 登出
export const USER_USERSYSMENUE = `/kaf/sysright/menu/systemMenu.action` // 获取菜单

// 忘记密码
export const sendSMSValidateCode = `/user/visitor/sendSMSValidateCode.action` // 获取验证码
export const checkValidateCode = `/user/visitor/checkValidateCode.action` // 校验验证码
export const resetPassword = `/user/visitor/resetPassword.action` // 保存

// 修改密码
export const changePassword = `/user/changePassword.action`
