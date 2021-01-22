<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link key="collapse" class="sidebar-logo-link" to="/">
        <img src="~@/assets/img/tmplogo.png" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
      <!-- <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link> -->
    </transition>
    <!-- <div>
      <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <span style="color: #fff;font-size:13px;">杨月明</span>
    </div>
     -->
    <div style="overflow: hidden;color: #fff;font-size:13px;padding:10px 8px">
      <div>当前用户：质量部 白灵玲</div>
    </div>
    <!-- <span style="height: 50px;display: block;color: #fff;">哈哈哈哈</span> -->
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '皓酌SQM平台',
      logo: '~@/assets/img/mypic.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  // height: 50px;
  padding-bottom: 8px;
  // line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 15px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
