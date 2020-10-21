<!--
    功能页面操作域组件。将条件域中的条件放入操作域中的“更多条件”下拉按钮中
-->
<template>
  <div id="area-operation">
    <div id="dropdown">
      <el-popover placement="bottom" trigger="click">
        <div id="moreCondition" />
        <span slot="reference" class="el-dropdown-link">
          更多条件<i class="el-icon-caret-bottom el-icon--right" />
        </span>
      </el-popover>
    </div>
    <slot />
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.el-dropdown-link{
  cursor: pointer;
  font-size: 13px;
  color: #1890ff;
}
#dropdown{
  display: none;
}
#moreCondition{
  margin: 0 0 -5px 3px;
}
#moreCondition .condition{
  margin-bottom:5px;
}

</style>

