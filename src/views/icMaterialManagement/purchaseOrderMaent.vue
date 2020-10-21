<template>
  <!-- 采购单管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.purchaseNo" placeholder="采购单单号" clearable class="input-item" />
      <el-select v-model="listQuery.purchaseType" placeholder="采购单种类" clearable class="input-item">
        <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.supplierNo" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <el-select v-model="listQuery.state" placeholder="采购单状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-date-picker
        v-model="listQuery.value1"
        style="width: 260px;"
        type="daterange"
        range-separator="至"
        start-placeholder="订单开始日期"
        end-placeholder="订单结束日期"
      />
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
      <el-table-column label="采购单单号" prop="purchaseNo" align="left" width="140" />
      <el-table-column label="采购单种类" prop="purchaseType" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp[scope.row.purchaseType].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商编号" prop="supplierNo" align="center" />
      <el-table-column label="供应商名称" prop="supplierName" align="left" width="240" />
      <el-table-column label="采购单状态" prop="state" align="center">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单日期" prop="purchaseDate" align="center" width="140" />
      <el-table-column label="业务员编号" show-overflow-tooltip prop="userNo" align="left" width="130" />
      <el-table-column label="业务员名称" show-overflow-tooltip prop="userName" align="left" />
      <el-table-column label="创建时间" show-overflow-tooltip prop="createDate" align="center" width="240" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit" /></el-button>
          <el-button type="text" style="color:red" @click="handleDelete(row,$index)"><span><i class="el-icon-delete" style="font-size:16px" /></span></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page-sizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { purchaseOrderMaentList } from '@/api/article'
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
        pageSizes: pageSizes
      },
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '外购件', value: '1' },
        { label: '表面处理', value: '2' }
      ],
      slStateOp: [
        { label: '未关闭', value: '0' },
        { label: '已关闭', value: '1' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      purchaseOrderMaentList(this.listQuery).then(response => {
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
      sessionStorage.setItem('purchaseOrderMaentDetl', '{}')
      this.$router.push({ path: 'purchaseOrderMaentDetl' })
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
      sessionStorage.setItem('purchaseOrderMaentDetl', JSON.stringify(row))
      this.$router.push({ path: 'purchaseOrderMaentDetl' })
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
