<template>
  <!-- 不合格单管理 -->
  <div class="app-container">
    <div id="area-condition-bar">
      <div id="area-condition">
        <div class="condition">
          <el-input v-model="listQuery.purchaseNo" placeholder="表单编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-select v-model="listQuery.purchaseType" placeholder="品名" clearable class="input-item">
            <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierNo" placeholder="产品规格" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="批号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="发现时间" clearable class="input-item" />
        </div>
        <div class="condition">
        <el-select v-model="listQuery.state" placeholder="发现地点" clearable class="input-item">
            <el-option v-for="item in fxddOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="listQuery.state" placeholder="综合判定" clearable class="input-item">
            <el-option v-for="item in zhpdOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="listQuery.state" placeholder="状态" clearable class="input-item">
            <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
        </el-select>
        </div>
      </div>
      <operation id="area-operation">
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addSl">新增</el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
        <el-button icon="el-icon-upload2" type="info">发起投诉</el-button>
      </operation>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="表单编号" prop="reviewNo" align="left" width="90" show-overflow-tooltip />
      <el-table-column label="品名" prop="partName" align="left" width="60">
      </el-table-column>
      <el-table-column label="产品规格" prop="specification" align="left"  width="100" />
      <el-table-column label="批号" prop="batchNo" align="left" width="120" />
      <el-table-column label="发现时间" prop="findTime" align="center" width="90">
      </el-table-column>
      <el-table-column label="检验数量" prop="inspectNum" align="right" width="70"/>
      <el-table-column label="不良数量" show-overflow-tooltip prop="rejectNum" align="right"  width="70" />
      <el-table-column label="不良率" show-overflow-tooltip prop="rejectRatio" align="right" width="70">
      <template slot-scope="scope">
          <div>
            {{ scope.row.rejectRatio}}%
          </div>
        </template>
      </el-table-column>
      <el-table-column label="可疑品数量" show-overflow-tooltip prop="suspectedNum"  align="right" width="80" />
      <el-table-column label="累计不良数量" show-overflow-tooltip prop="accumulativeRejectNum" align="right" width="100"/>
      <el-table-column label="发现人员" show-overflow-tooltip prop="userName" align="left" />
      <el-table-column label="发现地点" show-overflow-tooltip prop="findSite" align="left">
        <template slot-scope="scope">
          <div>
            {{ fxddOption[scope.row.findSite].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="不合格描述" show-overflow-tooltip prop="disqualificationDescription" align="left" />
      <el-table-column label="综合判定" show-overflow-tooltip prop="reviewResult" align="left">
        <template slot-scope="scope">
          <div>
            {{ zhpdOption[scope.row.reviewResult].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip prop="state" align="left">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
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
import { noReviewManagementList } from '@/api/article'
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
      fxddOption: [
        { label: '来料检验', value: '0' },
        { label: '一车间', value: '1' },
        { label: '三车间', value: '2' },
        { label: '包装', value: '3' },
        { label: '出货', value: '4' },
        { label: '客诉', value: '5' },
      ],
      zhpdOption:[
        { label: '运行', value: '0' },
        { label: '拒收', value: '1' },
        { label: '退货', value: '2' },
        { label: '挑选', value: '3' },
        { label: '特采', value: '4' }
      ],
      slStateOp: [
        { label: '进行中', value: '0' },
        { label: '已完成', value: '1' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      noReviewManagementList(this.listQuery).then(response => {
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
      sessionStorage.setItem('noReviewManagementDetl', '{}')
      this.$router.push({ path: 'noReviewManagementDetl' })
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
      sessionStorage.setItem('noReviewManagementDetl', JSON.stringify(row))
      this.$router.push({ path: 'noReviewManagementDetl' })
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
