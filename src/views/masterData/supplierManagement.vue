<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.supplierNo" placeholder="供应商编号" clearable class="input-item" />
      <el-input v-model="listQuery.supplierName" placeholder="供应商名称" clearable class="input-item" />
      <el-select v-model="listQuery.supplierType" placeholder="供应商分类" clearable class="input-item">
        <el-option v-for="item in slClassificationOp" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.supplierLevel" placeholder="供应商级别" clearable class="input-item">
        <el-option v-for="item in slLevelOp" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.state" placeholder="供应商状态" clearable class="input-item">
        <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <div style="float:right">
        <el-button type="primary" plain @click="handleFilter">
          查询
        </el-button>
        <el-button type="primary" plain @click="addSl">
          新增
        </el-button>
        <el-button type="primary" plain>
          导入
        </el-button>
        <el-button type="primary" plain>
          导出
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="供应商编号" prop="supplierNo" width="100" align="center" />
      <el-table-column label="供应商名称" show-overflow-tooltip prop="supplierName" width="260" align="left" />
      <el-table-column label="供应商分类" prop="supplierType" align="left">
        <template slot-scope="scope">
          <div>
            {{ slClassificationOp[scope.row.supplierType].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商级别" prop="supplierLevel" align="center">
        <template slot-scope="scope">
          <div>
            {{ slLevelOp[scope.row.supplierLevel].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商状态" prop="state" align="center">
        <template slot-scope="scope">
          <div>
            {{ slStateOp[scope.row.state].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createDate" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" plain icon="el-icon-edit" />
          <el-button type="danger" plain icon="el-icon-delete" />
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
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
      slLevelOp: [
        { label: 'A', value: '0' },
        { label: 'B', value: '1' }
      ],
      slStateOp: [
        { label: '启用', value: '0' },
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
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    addSl() {
      this.$router.push({ path: 'supplierManagementdelt' })
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
