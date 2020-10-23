<template>
<!-- 来料不良汇总 -->
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        class="input-item"
        v-model="listQuery.value1"
        type="daterange"
        range-separator="至"
        start-placeholder="来料开始日期"
        end-placeholder="来料结束日期">
      </el-date-picker>
      <el-select v-model="listQuery.state" placeholder="文件类型" clearable class="input-item">
        <el-option v-for="item in wjlxOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.supplierName" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <el-select v-model="listQuery.supplierType" placeholder="供应商分类" clearable class="input-item">
        <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="来料日期" prop="incomingDate" align="left" width="90" />
      <el-table-column label="供应商编号" prop="supplierNo" align="center" width="100" />
      <el-table-column label="供应商名称" prop="supplierName" align="left" width="200" />
      <el-table-column label="供应商分类" show-overflow-tooltip prop="supplierType" width="90" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp[scope.row.supplierType].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="批号" prop="batchNo" align="left" width="120" />
      <el-table-column label="品名" prop="partName" align="left" width="60"/>
      <el-table-column label="产品规格" prop="specification" align="left" width="100" />
      <el-table-column label="不良原因"  show-overflow-tooltip prop="rejectReason" align="left" />
      <el-table-column label="处理方式" prop="reviewResult"  width="70" align="left" >
        <template slot-scope="scope">
          <div>
            {{ ['','拒收','退货'][scope.row.reviewResult] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="确认" prop="confirmingPersonName" width="60" align="left" />
      <el-table-column label="改善状况" prop="amendConditions" width="70" align="left" />
    </el-table>
    <pagination v-show="total>0" :total="total" :pageSizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { incomingBadSummaryList } from '@/api/article'
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
        supplierNo: undefined,
        supplierName: undefined,
        supplierType: undefined,
        supplierLevel: undefined,
        state: undefined
      },
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '外购', value: '1' },
        { label: '表面处理', value: '2' },
        { label: '其它', value: '3' }
      ],
      wjlxOption: [
        { label: 'PPVP资料', value: '0' },
        { label: '承诺函', value: '1' },
        { label: '保证书', value: '2' },
        { label: 'IMDS', value: '3' },
        { label: 'ROSH报告', value: '4' },
        { label: '其它', value: '5' },
      ],
      slStateOp: [
        { label: '已创建', value: '0' },
        { label: '已完成', value: '1' },
        { label: '已关闭', value: '2' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      incomingBadSummaryList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
  }
}
</script>
<style lang="scss" scope>
.input-item{
  width: 130px;
  margin-right:15px
}
</style>
