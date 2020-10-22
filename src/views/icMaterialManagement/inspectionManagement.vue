<template>
  <!-- 采购单管理 -->
  <div class="app-container">
    <div id="area-condition-bar">
      <div id="area-condition">
        <div class="condition">
          <el-input v-model="listQuery.inspectionNo" placeholder="检验单编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.purchaseNo" placeholder="采购单号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.batchNo" placeholder="批号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-select v-model="listQuery.determine" placeholder="综合判定" clearable class="input-item">
            <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.environmental" placeholder="是否环保" clearable class="input-item">
            <el-option v-for="item in slClassificationOp1" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.state" placeholder="状态" clearable class="input-item">
            <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <operation id="area-operation">
        <el-button type="primary" plain @click="handleFilter">查询</el-button>
        <el-button type="primary" plain @click="addSl">新增</el-button>
        <el-button type="primary" plain>导出</el-button>
        <el-button type="primary" plain>导出检验报告</el-button>
        <el-button type="primary" plain>导出入库单</el-button>
        <el-button type="primary" plain>发起不合格评审</el-button>
      </operation>
    </div>
    <!-- <div class="filter-container"  style="float:left">
      <el-input v-model="listQuery.inspectionNo" placeholder="检验单编号" clearable class="input-item" />
      <el-input v-model="listQuery.purchaseNo" placeholder="采购单号" clearable class="input-item" />
      <el-input v-model="listQuery.batchNo" placeholder="批号" clearable class="input-item" />
      <el-select v-model="listQuery.determine" placeholder="综合判定" clearable class="input-item">
        <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.environmental" placeholder="是否环保" clearable class="input-item">
        <el-option v-for="item in slClassificationOp1" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.state" placeholder="状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
    </div> -->
      <!-- <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
        </el-button>
        <el-button type="primary" plain @click="addSl">
          新增
        </el-button>
        <el-button type="primary" plain>
          导出
        </el-button>
        <el-button type="primary" plain>
          导出检验报告
        </el-button>
        <el-button type="primary" plain>
          导出入库单
        </el-button>
        <el-button type="primary" plain>
          发起不合格评审
        </el-button>
      </div> -->
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="检验单编号" show-overflow-tooltip prop="inspectionNo" align="left" width="130"/>
      <el-table-column label="检验报告编号" prop="surveyReportNo" show-overflow-tooltip align="left" width="130" />
      <el-table-column label="入库单号" prop="incomingNo" show-overflow-tooltip align="left" width="130" />
      <el-table-column label="采购单号" prop="purchaseNo" show-overflow-tooltip align="left" width="110" />
      <el-table-column label="批号" prop="batchNo" align="left" show-overflow-tooltip width="120" />
      <el-table-column label="来料数量" prop="incomingNum" align="left" width="68" />
      <el-table-column label="检验数量" prop="inspectNum" align="left" width="68" />
      <el-table-column label="综合判定" prop="determine" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp[scope.row.determine].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否环保" prop="environmental" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp1[scope.row.environmental].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="环保标识是否齐全" prop="environmentalProtectionLabel" width="118" align="left">
        <template slot-scope="scope">
          <div>
            {{ scope.row.environmentalProtectionLabel=='0'?'齐全':'不齐全' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="不良率" prop="rejectRatio" align="right"  width="60">
      <template slot-scope="scope">
          <div>
            {{ scope.row.rejectRatio}}%
          </div>
        </template>
      </el-table-column>
      <el-table-column label="仓管员" prop="storeUserName" align="left" width="60" />
      <el-table-column label="物控核准" prop="materialApproval" align="center" width="70" />
      <el-table-column label="检验员" show-overflow-tooltip prop="inspectUserName" align="left" width="60" />
      <el-table-column label="品质核准" show-overflow-tooltip prop="qualityApproval" align="left" width="70" />
      <el-table-column label="状态" prop="state" align="center">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
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
import { inspectionManagementList } from '@/api/article'
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
      slClassificationOp: [
        { label: '合格', value: '0' },
        { label: '不合格', value: '1' }
      ],
      slClassificationOp1: [
        { label: 'HSF环保', value: '0' },
        { label: 'HS非环保', value: '1' }
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
      inspectionManagementList(this.listQuery).then(response => {
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
      sessionStorage.setItem('inspectionManagementDetl', '{}')
      this.$router.push({ path: 'inspectionManagementDetl' })
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
      sessionStorage.setItem('inspectionManagementDetl', JSON.stringify(row))
      this.$router.push({ path: 'inspectionManagementDetl' })
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
