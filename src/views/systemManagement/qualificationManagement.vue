<template>
  <!-- 投诉单管理 -->
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
          <el-select v-model="listQuery.category" placeholder="资质类别" clearable class="input-item">
            <el-option v-for="item in zzlbOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-select v-model="listQuery.name" placeholder="资质名称" clearable class="input-item">
            <el-option v-for="item in zzmcOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="有效期起始" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-input v-model="listQuery.supplierName" placeholder="有效期截止" clearable class="input-item" />
        </div>
        <div class="condition">
          <el-select v-model="listQuery.validity" placeholder="有效性" clearable class="input-item">
            <el-option v-for="item in yxxOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
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
      </operation>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="供应商编号" prop="supplierNo" align="left"/>
      <el-table-column label="供应商名称" show-overflow-tooltip  prop="supplierName" align="left" width="230"/>
      <el-table-column label="资质类别" show-overflow-tooltip prop="category" align="left">
      <template slot-scope="scope">
          <div>
            {{zzlbOption[scope.row.category].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="资质名称" show-overflow-tooltip prop="name" align="left">
      <template slot-scope="scope">
          <div>
            {{zzmcOption[scope.row.name].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="资质证书有效期起始" show-overflow-tooltip prop="startDate"  align="center" />
      <el-table-column label="资质证书有效期截止" show-overflow-tooltip prop="endingDate" align="left"/>
      <el-table-column label="有效性" show-overflow-tooltip prop="validity" align="left" >
          <template slot-scope="scope">
          <div>
            {{yxxOption[scope.row.validity].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip prop="state" align="left" >
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center"  width="90">
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
import { qualificationManagementList } from '@/api/article'
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
      zzlbOption: [
        { label: '体系', value: '0' },
        { label: '过程', value: '1' },
        { label: '安全', value: '2' },
        { label: '环境', value: '3' }
      ],
      yxxOption: [
        { label: '有效', value: '0' },
        { label: '过期', value: '1' }
      ],
      zzmcOption: [
        { label: 'TS16949', value: '0' },
        { label: 'IS09001', value: '1' }
      ],
      slStateOp: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' },
      ],
      tableData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      qualificationManagementList(this.listQuery).then(response => {
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
      sessionStorage.setItem('qualificationManagementDelt', '{}')
      this.$router.push({ path: 'qualificationManagementDelt' })
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
      sessionStorage.setItem('qualificationManagementDelt', JSON.stringify(row))
      this.$router.push({ path: 'qualificationManagementDelt' })
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
