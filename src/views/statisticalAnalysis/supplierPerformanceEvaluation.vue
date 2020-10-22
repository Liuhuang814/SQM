<template>
<!-- 供应商业绩评价  -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.supplierName" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <el-date-picker
        v-model="listQuery.value3"
        type="year"
        placeholder="选择年份">
      </el-date-picker>
      <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
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
      <el-table-column label="供应商编号" prop="supplierNo" align="left"  width="100"/>
      <el-table-column label="供应商名称" prop="supplierName" align="left" />
      <el-table-column label="年份" show-overflow-tooltip prop="particularYear" width="100" align="left" />
      <el-table-column label="1月" prop="january" align="left" width="70" >
      <template slot-scope="scope">
        <div>
            <el-tag type="success">40.0</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="2月" prop="january" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag type="success">40.0</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="3月" prop="january" align="left" width="70"/>
      <el-table-column label="4月" prop="january" align="left" width="70"/>
      <el-table-column label="5月" prop="january" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag type="success">50.0</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="6月" prop="january" align="left" width="70"/>
      <el-table-column label="7月" prop="january" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag type="success">50.0</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="8月" prop="january" align="left" width="70"/>
      <el-table-column label="9月" prop="september" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag v-if="scope.row.september" type="success">{{scope.row.september}}</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="10月" prop="october" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag v-if="scope.row.october" type="success">{{scope.row.october}}</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="11月" prop="november" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag v-if="scope.row.november" type="success">{{scope.row.november}}</el-tag>
        </div>
      </template>
      </el-table-column>
      <el-table-column label="12月" prop="december" align="left" width="70">
      <template slot-scope="scope">
        <div>
            <el-tag v-if="scope.row.december" type="success">{{scope.row.december}}</el-tag>
        </div>
      </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :pageSizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { supplierPerformanceEvaluationList } from '@/api/article'
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
      supplierPerformanceEvaluationList(this.listQuery).then(response => {
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
