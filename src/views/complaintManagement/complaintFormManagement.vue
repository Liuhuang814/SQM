<template>
  <!-- 投诉单管理 -->
  <div class="app-container">
    <div id="area-condition-bar">
      <div id="area-condition">
        <div class="condition">
          <el-input v-model="listQuery.purchaseNo" placeholder="投诉单编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierNo" placeholder="品名" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="产品规格" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="批号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="发现时间" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="供应商编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-select v-model="listQuery.state" placeholder="发生阶段" clearable class="input-item">
            <el-option v-for="item in fsjdOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.state" placeholder="状态" clearable class="input-item">
            <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <operation id="area-operation">
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addSl">新增</el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
        <el-button icon="el-icon-upload2" type="info">提交审批</el-button>
        <el-button type="warning" icon="el-icon-document" plain>审批</el-button>
        <el-button type="info" icon="el-icon-s-fold" plain>审批记录</el-button>

      </operation>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="投诉单编号" prop="invoiceNo" align="left" width="120" />
      <el-table-column label="品名" prop="part.partName" align="left" width="60"/>
      <el-table-column label="产品规格" prop="part.specification" align="left" width="100"/>
      <el-table-column label="批号" prop="batchNo" align="left" width="120" />
      <el-table-column label="供应商编号" prop="supplier.supplierNo" align="center" width="90"/>
      <el-table-column label="供应商名称" show-overflow-tooltip  prop="supplier.supplierName" align="center"/>
      <el-table-column label="发现时间" show-overflow-tooltip prop="findTime" align="left"  width="100" />
      <el-table-column label="检验数量" show-overflow-tooltip prop="inspectNum" align="left" width="80" />
      <el-table-column label="不良数量" show-overflow-tooltip prop="rejectNum"  align="center" width="80" />
      <el-table-column label="不良率" show-overflow-tooltip prop="rejectRatio" align="left" width="80" />
      <el-table-column label="发生阶段" show-overflow-tooltip prop="createStage" align="left"  width="80">
          <template slot-scope="scope">
          <div>
            {{ fsjdOption[scope.row.createStage]?fsjdOption[scope.row.createStage].label:'客诉' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip prop="state" align="left"  width="80">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  width="80">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit" /></el-button>
          <el-button type="text"  @click="handleDelete(row,$index)"><span><i class="el-icon-delete" style="font-size:16px" /></span></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page-sizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { complaintFormManagementList } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
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
        pageSizes: pageSizes
      },
      fsjdOption: [
        { label: '制程检验', value: '2' },
        { label: '客诉', value: '3' },
        { label: '进行检验', value: '1' }
      ],
      slStateOp: [
        { label: '进行中', value: '0' },
        { label: '审核中', value: '1' },
        { label: '已完成', value: '1' },
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      complaintFormManagementList(this.listQuery).then(response => {
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
      sessionStorage.setItem('complaintFormManagementDetl', '{}')
      this.$router.push({ path: 'complaintFormManagementDetl' })
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
      sessionStorage.setItem('complaintFormManagementDetl', JSON.stringify(row))
      this.$router.push({ path: 'complaintFormManagementDetl' })
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
