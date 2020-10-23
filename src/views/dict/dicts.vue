<template>
<!-- 操作日志 -->
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.partName" placeholder="字典名称" clearable class="input-item" />
      <el-select v-model="listQuery.state" placeholder="使用状态" clearable class="input-item">
        <el-option v-for="item in businessTypeOpt" :key="item.value+item.label" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addSl">新增</el-button>
        <el-button icon="el-icon-download" type="warning">导出</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="tableH"
      highlight-current-row
      style="width: 100%"
      ref="itsmDataTable"
       @expand-change="rowExpand">
    >
      <el-table-column type="expand" prop="">
        <template slot-scope="scope">
          <el-table :data="scope.row.dictDetails" style="width: 50%;">
            <el-table-column label="字典编号" prop="dictId"/>
            <el-table-column label="字典名称" prop="dicName"/>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="记录编号" show-overflow-tooltip prop="dictId" align="center" width="180" />
      <el-table-column label="字典名称" show-overflow-tooltip prop="dictName" width="150"  align="left" />
      <el-table-column label="字典类型" show-overflow-tooltip prop="dictType" width="80"  align="left" />
      <el-table-column label="登录状态" show-overflow-tooltip prop="businessType" width="80"  align="left" >
        <template slot-scope="scope">
          <div>
            {{ businessTypeOpt[scope.row.status]?businessTypeOpt[scope.row.status].label:'' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用途描述" show-overflow-tooltip prop="remark" align="left" />
      <el-table-column label="创建人" show-overflow-tooltip prop="createBy" align="left" />
      <el-table-column label="创建时间" show-overflow-tooltip prop="createTime" width="180"  align="left" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="details(row)"><i style="font-size:16px" class="el-icon-edit"></i></el-button>
          <el-button type="text" @click="handleDelete(row,$index)"><i style="font-size:16px" class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :pageSizes="listQuery.pageSizes" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="dialogFormVisible" title="数据字典维护">
      <el-form ref="dataForm" label-position="left" label-width="150px" style="margin-left:50px;margin-right:50px;">
        <el-form-item label="字典名称" prop="title">
          <el-input v-model="rs.dictName" />
        </el-form-item>
        <el-form-item label="字典分类" prop="title">
          <el-input v-model="rs.dictType" />
        </el-form-item>
        <el-form-item label="用途说明" prop="operIp">
          <el-input type="textarea" v-model="rs.remark" />
        </el-form-item>
        <el-divider content-position="left">字典选项列表</el-divider>
        <el-table :data="rs.dictDetails">
          <el-table-column label="序号" align="center" width="80px;">
            <template slot-scope="{row,$index}">
              <label> {{ $index+1 }}</label>
            </template>
          </el-table-column>
          <el-table-column label="字典编号" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.dictId" clearable />
            </template>
          </el-table-column>
          <el-table-column label="字典名称" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.dicName" clearable />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">
          保存
        </el-button>
        <el-button type="primary" plain @click="dialogFormVisible = false">
          关闭
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
      orderDetailData: null,
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
        { label: '成功', value: '0' },
        { label: '失败', value: '1' }
      ],
      tableData: [],
      businessTypeOpt: [
        { label: '正常', value: '0' },
        { label: '停用', value: '1' },
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const tmpData = jobsList.rows
      this.tableData = this.pagination(this.listQuery.page,this.listQuery.pageSizes[0],tmpData)
      console.log(this.tableData)
      this.total = jobsList.rows.total
      this.total = jobsList.total
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    },
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize;
      return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
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
