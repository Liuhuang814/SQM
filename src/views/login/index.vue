<template>
  <div class="backImgBox">
    <div class="logo-head">
      <div class="logo-head-text">
        SQM-供应商质量管理系统
      </div>
    </div>
    <div class="bg">
      <div class="loginBox">
        <!-- <div class="login-left-img" /> -->
        <h5 class="login-title"> 账号登录 </h5>
        <!-- <h3 class="login-sub-title"> 请使用账号密码登录 </h3> -->
        <div class="form-area">
          <el-form
            ref="loginForm"
            :model="baseForm"
            :rules="formRules"
            label-width="0px"
          >
            <el-form-item label prop="username">
              <el-input
                v-model.trim="baseForm.username"
                :minlength="3"
                :maxlength="18"
                size="large"
                placeholder="账号"
                clearable
              >
                <img
                  slot="prefix"
                  src="~@/assets/img/username.png"
                  alt
                  class="inner-icon"
                >
              </el-input>
            </el-form-item>

            <div style="position:relative;">
              <el-form-item label prop="password">
                <el-input
                  v-if="!baseForm.password.length"
                  ref="pwd"
                  v-model.trim="baseForm.password"
                  :minlength="6"
                  :maxlength="18"
                  size="large"
                  type="text"
                  placeholder="密码"
                >
                  <img
                    slot="prefix"
                    src="~@/assets/img/password.png"
                    alt
                    class="inner-icon"
                  >
                </el-input>
                <el-input
                  v-else
                  ref="pwd"
                  v-model.trim="baseForm.password"
                  :minlength="6"
                  :maxlength="18"
                  size="large"
                  type="password"
                  placeholder="密码"
                  @keyup.enter.native="submitForm()"
                >
                  <img
                    slot="prefix"
                    src="~@/assets/img/password.png"
                    alt
                    class="inner-icon"
                  >
                </el-input>
              </el-form-item>
            </div>
            <div style="overflow: hidden;">
              <el-checkbox
                v-model="rememberAccount"
                class="c-l-f"
                true-label="1"
                false-label="0"
              >记住账号</el-checkbox>
            </div>
          </el-form>
          <div class="loginBtn">
            <el-button
              :loading="loading"
              :disabled="loading"
              type="primary"
              class="btn-sub"
              @click="handleLogin()"
            >
              <span class="logText">登录</span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      rememberAccount: true,
      baseForm: {
        username: 'admin',
        password: '111111'
      },
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.baseForm.username === '') {
      this.$refs.username.focus()
    } else if (this.baseForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.baseForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.c-l-f{
  float: left;
}
.c-l-r{
  float: right
}
.login-title {
    color: #4d85fd;
    font-weight: 500;
    font-size: 22px;
    letter-spacing: 4px;
    text-align: center;
    margin: 30px 0 10px 0;
}
.login-sub-title {
    color: #9289a6;
    /* margin-bottom: 40px; */
    font-size: 15px;
    text-align: center;
    margin-top: 0;
    letter-spacing: 4px;
}
.backImgBox {
  width: 100%;
  height: 100%;
  /* background: url("../../assets/img/login/bg.png") no-repeat center; */
  /* background-size: cover; */
  /* background-position:0px 80px; */
  position: relative;
}
.bg {
  width: 100%;
  height: calc(100% - 100px);
  background: url('~@/assets/img/login_bk.jpg') no-repeat center;
  background-size: 100% 100%;
  /* background-position:0px 80px; */
}
.logo-head {
  width: 100%;
  height: 100px;
  position: relative;
  background: #f6f6f6;
  line-height: 100px;
  text-align: center;
}
.logo-head-text {
  font-size: 29px;
  font-weight: 500;
  display: inline-block;
  letter-spacing: 4px;
}
.logo-head-text > span {
  font-size: 28px;
  letter-spacing: 4px;
}
.logo-head-text > img {
  margin-right: 15px;
}
.logo-head-text .logo1 {
  margin-top: 27px;
}
.logo-head-text .logo2 {
  margin-top: 34px;
  margin-left: 12px;
}
.loginBox {
  border-radius: 12px;
  width: 32.5%;
  height: 320px;
  /* background: rgba(254, 254, 254, 0.4); */
  background: #ffffff;
  box-shadow: 10px 10px 10px 0px rgba(33, 113, 196, 0.2);
  position: absolute;
  top: 55%;
  /* right: 100px; */
  left: 0;
  right: 0;
  margin: auto;
  margin-top: -175px;
}
.login-left-img {
  float: left;
  width: 47.2%;
  height: 375px;
  /* background: url("../../assets/img/login/login-left.png") 40px 30px no-repeat; */
}
.form-area {
  float: left;
  text-align: center;
  width: 100%;
  padding-top: 8px;
  /* height: 375px; */
  border-radius: 2px;
  /* background: rgba(255, 255, 255, 0.4); */
  padding: 1px 35px;
  position: relative;
}
.form-area .el-form {
  margin-top: 10px;
}
.form-area .el-form-item {
  margin-bottom: 18px;
}
.inner-icon {
  margin-top: 8px;
  margin-left: 2px;
  width: 20px;
  height: 20px;
}

.codeOuter .el-input {
  width: 54%;
  margin-right: 4%;
  float: left;
}
.codeText {
  color: rgb(204, 204, 204);
  margin-top: 5px;
  display: inline-block;
  width: 41%;
  display: flex;
  justify-content: space-between;
}
.the-code {
  width: 115px;
  height: 36px;
  float: right;
  border: 1px solid #bfcbd9;
  border-radius: 3px;
}
.the-code img {
  width: 100%;
  height: 100%;
}
.the-code >>> .el-loading-spinner {
  margin-top: -14px;
}
.btn-sub {
  width: 100%;
  height: 38px;
  /* background-color: #c1392b;
  border:1px solid #c1392b; */
}
.logText {
  font-size: 18px;
  letter-spacing: 11px;
  /* text-indent: 11px; */
  padding-left: 11px;
}
.text-forget {
  color: #ffae00;
  /* font-size:16px; */
  cursor: pointer;
  margin-top: 3px;
}
.foot {
  text-align: center;
  position: fixed;
  bottom: 30px;
  width: 100%;
  /* height:30px; */
  line-height: 30px;
  /* background:rgba(255,255,255,1); */
}
.foot-text div span,
.foot-text div {
  font-size: 12px;
  text-align: center;
  color: #ddeeff;
}
.foot-text a {
  text-decoration: none;
  color: #2400ff;
}
.foot-text a:hover {
  color: #184bdc;
}
.input-width {
  width: 200px;
}
.loginBtn {
 margin-top:48px;
}
.hidePwd {
  position: absolute;
  top: 0;
  z-index: 1;
  opacity: 0;
  width: 100%;
}
.hidePwd input {
  color: #ffffff !important;
}
</style>

<style>
.form-area .el-tabs__content {
  height: 280px;
}
.form-area .el-tabs__item {
  font-size: 18px;
}
.form-area .el-tabs {
  margin-top: 24px;
}
.form-area .el-tabs__nav-wrap::after {
  background-color: unset;
}
.form-area .el-tabs__header {
  padding-left: 60px;
}
.form-area #tab-second {
  padding-left: 24px;
}
.qrcodeLogin div {
  font-size: 16px;
  text-align: center;
  line-height: 26px;
}
.qrcodeLogin div span {
  font-size: 16px;
  color: #368ae2;
}
.form-area .el-input__prefix {
  margin: 3px 0;
  padding-right: 12px;
  left: 12px;
  border-right: 1px solid #dddddd;
  height: calc(100% - 6px);
}
.form-area .el-input--prefix .el-input__inner {
  padding-left: 56px;
  height: 38px;
  line-height: 38px;
}
.form-area .inner-icon {
  margin-top: 5px;
}
.form-area .el-button--primary {
  background-color: #4d85fd;
  border-color: #4d85fd;
}
.form-area .el-button--primary:hover {
  background-color: #6596fd;
  border-color: #6596fd;
}
.foot-text div.runOperationBox {
  color: #ffe400;
  cursor: pointer;
  margin: auto;
  display: inline-block;
}
</style>
