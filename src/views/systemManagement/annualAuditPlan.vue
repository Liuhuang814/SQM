<template>
  <!-- 年度审核计划 -->
  <div class="app-container">
    <div id="area-condition-bar">
      <div id="area-condition">
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="供应商编号" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-select v-model="listQuery.category" placeholder="审核类别" clearable class="input-item">
            <el-option v-for="item in shlbOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.name" placeholder="资质类别" clearable class="input-item">
            <el-option v-for="item in zzlbOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="开始时间" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="截止时间" clearable class="input-item" />
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
        <el-button type="primary" plain >审核计划审批</el-button>
        <el-button type="primary" plain >审核结果录入</el-button>
        <el-button type="primary" plain >审核结果审批</el-button>
        <el-button type="primary" plain >导出</el-button>
      </operation>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="供应商编号" width="80" prop="supplier.supplierNo" align="left"/>
      <el-table-column label="供应商名称" show-overflow-tooltip  prop="supplier.supplierName" align="left"/>
      <el-table-column label="审核类别" width="70" show-overflow-tooltip prop="reviewCategory" align="left">
      <template slot-scope="scope">
          <div>
            {{shlbOption[scope.row.reviewCategory].label }}
          </div>
        </template>VDA6.5
      </el-table-column>
      <el-table-column label="资质类别" width="70" show-overflow-tooltip prop="quaCategory" align="left"/>
      <el-table-column label="资质名称" width="70" prop="quaName" align="left"/>
      <el-table-column label="证书有效期开始时间" width="130" show-overflow-tooltip prop="cerValidityStart"  align="center" />
      <el-table-column label="证书有效期截止时间" width="130" show-overflow-tooltip prop="cerValidityEnd" align="left"/>
      <el-table-column label="主要产品" show-overflow-tooltip width="70" prop="mainProducts" align="left"/>
      <el-table-column label="审核方式"  width="70" prop="supplierNo" align="left">
      <template slot-scope="scope">
          <div>
            VDA6.5
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核结果" width="70" prop="auditResult" align="left"/>
      <el-table-column label="下次审核日期" show-overflow-tooltip width="95" prop="auditFinishDate" align="left"/>
      <el-table-column label="整改完成" prop="completeReform" width="80" align="left">
      <template slot-scope="scope">
          <div>
            {{ scope.row.completeReform=='1'?'完成':'未完成' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60" show-overflow-tooltip prop="state" align="left" >
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="60">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit" /></el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page-sizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import { annualAuditPlanList } from '@/api/article'
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
      shlbOption: [
        { label: '原材料', value: '0' },
        { label: '紧固件', value: '1' },
        { label: '表面处理', value: '2' },
        { label: '其它', value: '3' }
      ],
      zzlbOption: [
        { label: '体系', value: '0' },
        { label: '过程', value: '1' },
        { label: '安全', value: '2' },
        { label: '环境', value: '3' }
      ],
      slStateOp: [
        { label: '已生成', value: '0' },
        { label: '已审批', value: '1' },
        { label: '已录入', value: '2' },
        { label: '已完成', value: '3' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      annualAuditPlanList(this.listQuery).then(response => {
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
      sessionStorage.setItem('annualAuditPlanDelt', '{}')
      this.$router.push({ path: 'annualAuditPlanDelt' })
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
      sessionStorage.setItem('annualAuditPlanDelt', JSON.stringify(row))
      this.$router.push({ path: 'annualAuditPlanDelt' })
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
