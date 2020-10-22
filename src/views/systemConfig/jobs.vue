<template>
<!-- 零件管理 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.partName" placeholder="任务名称" clearable class="input-item" />
      <el-select v-model="listQuery.state" placeholder="任务状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
        </el-button>
        <el-button type="primary" plain @click="showDetail">
          新增
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
      ref="itsmDataTable"
    >
      <el-table-column label="任务编号" prop="jobId" align="center" width="80" />
      <el-table-column label="任务名称" show-overflow-tooltip prop="jobName" align="left" />
      <el-table-column label="任务分组" show-overflow-tooltip prop="jobGroup" width="80"  align="left" />
      <el-table-column label="调用java方法字符串" show-overflow-tooltip prop="invokeTarget" align="left" />
      <el-table-column label="执行表达式" show-overflow-tooltip prop="cronExpression" width="100"  align="left" />
      <el-table-column label="任务状态" show-overflow-tooltip prop="status" width="80"  align="left" >
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.status].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip prop="nextValidTime" width="140"  align="left" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-video-play"></i></el-button>
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit"></i></el-button>
          <el-button type="text" @click="handleDelete(row,$index)"><i style="font-size:16px" class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :pageSizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogFormVisible" title="Job任务详情">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item label="任务名称" prop="title">
          <el-input v-model="rs.jobName" />
        </el-form-item>
        <el-form-item label="调用java方法字符串" prop="invokeTarget">
          <el-input v-model="rs.invokeTarget" />
        </el-form-item>
        <el-form-item label="执行表达式" prop="cronExpression">
          <el-input v-model="rs.cronExpression" />
        </el-form-item>
        <el-form-item label="状态" prop="cronExpression">
          <el-select v-model="rs.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTableBestRows } from '@/utils/businessUtil'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { jobsList } from './json'
export default {
  components: { Pagination },
  data() {
    const tableH = document.body.clientHeight - 210
    const pageSizes = getTableBestRows(tableH,'textButton')
    return {
      rs: {
        jobName: '',
        invokeTarget: '',
        cronExpression: '',
        status: '0'
      },
      dialogFormVisible: false,
      total: 0,
      tableH: tableH, // 表格高度
      listQuery: {
        page: 1,
        limit: pageSizes[0],
        pageSizes: pageSizes,
        supplierNo: undefined,
        supplierName: undefined,
        supplierType: undefined,
        supplierLevel: undefined,
        state: undefined
      },
      slStateOp: [
        { label: '正常', value: '0' },
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
      this.tableData = jobsList.rows
      this.total = jobsList.rows.total
      this.total = jobsList.total
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    addSl() {
      sessionStorage.setItem('supplierManagementdelt',{})
      this.$router.push({ path: 'supplierManagementdelt' })
    },
    handleDelete(row, index) {
      this.$confirm('确认删除当前记录？', '删除确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        callback: action => {
          if (action === 'confirm') {
            this.$notify({
              title: '成功',
              message: '数据删除成功！',
              type: 'success',
              duration: 2000
            })
            this.tableData.splice(index, 1)
          }else {
            console.log('按下 取消')
          }
        }
      })      
    },
    details(row) {
      this.rs = row
      this.dialogFormVisible = true
    },
    showDetail() {
      this.rs = {}
      this.dialogFormVisible = true
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
