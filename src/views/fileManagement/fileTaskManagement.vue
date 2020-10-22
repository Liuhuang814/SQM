<template>
<!-- 供应商管理 -->
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.supplierNo" placeholder="文件类型" clearable class="input-item" /> -->
      <el-select v-model="listQuery.state" placeholder="文件类型" clearable class="input-item">
        <el-option v-for="item in wjlxOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.supplierName" placeholder="完成人员名称" clearable class="input-item" />
      <el-select v-model="listQuery.state" placeholder="任务状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="listQuery.supplierName" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
        </el-button>
        <el-button type="primary" plain @click="addSl">
          新增
        </el-button>
        <el-button type="primary" plain>
          上传文件
        </el-button>
        <el-button type="primary" plain>
          审批
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
      <el-table-column label="任务编号" prop="taskNo" width="120" align="center" />
      <el-table-column label="文件类型" prop="fileType" width="70" align="center">
      <template slot-scope="scope">
          <div>
            {{ wjlxOption[scope.row.fileType].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商编号" prop="supplier.supplierNo" width="100" align="center" />
      <el-table-column label="供应商名称" show-overflow-tooltip prop="supplier.supplierName" align="left" />
      <el-table-column label="完成人员名称" prop="updateUserName" width="100" align="left" />
      <el-table-column label="完成文件的开始日期" prop="compStartDate" width="130" align="center" />
      <el-table-column label="完成文件的截止日期" prop="compEndDate" width="130" align="center" />
      <el-table-column label="任务实际完成时间" prop="compActualDate" width="120" align="center" />
      <el-table-column label="任务状态" prop="taskState" align="left" width="70">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.taskState].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" prop="apprState" align="left" width="70">
        <template slot-scope="scope">
          <div>
            {{ ['未审核','通过'][scope.row.apprState] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="70">
        <template slot-scope="{row,$index}">
          <!-- <el-button type="primary" @click="details(row)" plain icon="el-icon-edit" />
          <el-button type="danger" @click="handleDelete(row,$index)" plain icon="el-icon-delete" /> -->
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
import { fileTaskManagementList } from '@/api/article'
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
      fileTaskManagementList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    addSl() {
      sessionStorage.setItem('fileTaskManagementDelt','{}')
      this.$router.push({ path: 'fileTaskManagementDelt' })
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
      sessionStorage.setItem('fileTaskManagementDelt',JSON.stringify(row))
      this.$router.push({ path: 'fileTaskManagementDelt' })
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
