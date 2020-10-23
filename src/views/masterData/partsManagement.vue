<template>
  <!-- 零件管理 -->
  <div class="app-container">
    <div id="area-condition-bar">
      <div id="area-condition">
        <div class="condition">
          <el-input v-model="listQuery.partNo" placeholder="零件编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.partName" placeholder="品名" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.specification" placeholder="产品规格" clearable class="input-item" />
        </div>
        <div class="condition">
         <el-select v-model="listQuery.partType" placeholder="零件分类" clearable class="input-item">
          <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
        </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.state" placeholder="零件状态" clearable class="input-item">
            <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <operation id="area-operation">
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addSl">新增</el-button>
        <el-button icon="el-icon-upload2" type="info">导入</el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
      </operation>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="零件编号" prop="partNo" align="left" />
      <el-table-column label="品名" show-overflow-tooltip prop="partName" align="left" />
      <el-table-column label="产品规格" show-overflow-tooltip prop="specification" align="left" />
      <el-table-column label="材料" show-overflow-tooltip prop="materials" align="left" width="230" />
      <el-table-column label="零件分类" prop="partType" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp[scope.row.partType].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="版本" show-overflow-tooltip prop="version" align="left" />
      <el-table-column label="状态" prop="state" align="center">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <!-- <el-button type="primary" @click="details(row)" plain icon="el-icon-edit" />
          <el-button type="danger" @click="handleDelete(row,$index)" plain icon="el-icon-delete" /> -->
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit" /></el-button>
          <el-button type="text" @click="handleDelete(row,$index)"><span><i class="el-icon-delete" style="font-size:16px" /></span></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page-sizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { partsManagementList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { rows } from './json'
export default {
  components: { Pagination },
  data() {
    const tableH = document.body.clientHeight - 210
    const pageSizes = getTableBestRows(tableH,'textButton')
    return {
      total: 0,
      tableH: tableH, // 表格高度
      listQuery: {
        page: 1,
        limit: pageSizes[0],
        pageSizes: pageSizes,
        partNo: undefined,
        partName: undefined,
        specification: undefined,
        partType: undefined,
        state: undefined
      },
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '半成品', value: '1' },
        { label: '成品', value: '2' }
      ],
      slStateOp: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      partsManagementList(this.listQuery).then(response => {
        console.log(response)
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    addSl() {
      sessionStorage.setItem('partsManagementDetl', '{}')
      this.$router.push({ path: 'partsManagementDetl' })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
    },
    details(row) {
      sessionStorage.setItem('partsManagementDetl', JSON.stringify(row))
      this.$router.push({ path: 'partsManagementDetl' })
    }
  }
}
</script>
<style lang="scss" scope>
.input-item{
  width: 130px;
  margin-right:15px
}
</style>
