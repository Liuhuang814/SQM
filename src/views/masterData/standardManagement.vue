<template>
<!-- 效验标准管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.standardNo" placeholder="标准编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierNo" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <el-input v-model="listQuery.partName" placeholder="品名" clearable class="input-item" />
      <el-input v-model="listQuery.specification" placeholder="产品规格" clearable class="input-item" />
      <el-select v-model="listQuery.state" placeholder="状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
        </el-button>
        <el-button type="primary" plain @click="addSl">
          新增
        </el-button>
        <el-button type="primary" plain>
          导入
        </el-button>
        <el-button type="primary" plain>
          导出
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="标准编号" prop="standardNo" align="left" />
      <el-table-column label="供应商编号" prop="supplierNo" align="left" />
      <el-table-column label="供应商名称" prop="supplierName" align="left" width="240" />
      <el-table-column label="零件编号" prop="partNo" align="left" width="140"/>
      <el-table-column label="品名" show-overflow-tooltip prop="partName" align="left" />
      <el-table-column label="材料" show-overflow-tooltip prop="materials" align="left" width="230" />
      <el-table-column label="产品规格" show-overflow-tooltip prop="specification" align="left" />
      <el-table-column label="状态" prop="state" align="center">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit"></i></el-button>
          <el-button type="text" @click="handleDelete(row,$index)" style="color:red"><span><i class="el-icon-delete" style="font-size:16px"></i></span></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :pageSizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { standardManagementList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    const tableH = document.body.clientHeight - 210
    const pageSizes = getTableBestRows(tableH)
    return {
      total: 0,
      tableH: tableH, // 表格高度
      listQuery: {
        page: 1,
        limit: pageSizes[0],
        pageSizes:pageSizes,
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
      standardManagementList(this.listQuery).then(response => {
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
      sessionStorage.setItem('standardManagementDelt','{}')
      this.$router.push({ path: 'standardManagementDelt' })
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
    details(row){
      sessionStorage.setItem('standardManagementDelt',JSON.stringify(row))
      this.$router.push({ path: 'standardManagementDelt' })
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
