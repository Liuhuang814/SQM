<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="供应商编号" class="input-item"/>
      <el-input v-model="listQuery.name" placeholder="供应商名称" class="input-item" />
      <el-select v-model="listQuery.slClassification" placeholder="供应商分类" clearable class="input-item">
        <el-option v-for="item in slClassificationOp" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.slLevel" placeholder="供应商级别" clearable class="input-item" >
        <el-option v-for="item in slLevelOp" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.slState" placeholder="供应商状态" clearable class="input-item" >
        <el-option v-for="item in slStateOp" :key="item" :label="item" :value="item" />
      </el-select>
      <div style="float:right">
        <el-button type="primary">
        查询
        </el-button>
        <el-button type="primary">
        新增
        </el-button>
        <el-button type="primary">
        导入
        </el-button>
        <el-button type="primary">
        导出
        </el-button>
      </div>
    </div>
    <el-table
    :data="tableData"
    stripe
    highlight-current-row
    style="width: 100%">
    <el-table-column label="供应商编号" prop="supplierNo" align="center"></el-table-column>
    <el-table-column label="供应商名称" show-overflow-tooltip prop="supplierName" align="left"></el-table-column>
    <el-table-column label="供应商分类" prop="supplierType" align="center">
      <template slot-scope="scope">
        <div>
          {{slClassificationOp[scope.row.supplierType]}}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="供应商级别" prop="supplierLevel" align="center"></el-table-column>
    <el-table-column label="供应商状态" prop="state" align="center"></el-table-column>
    <el-table-column label="创建时间" prop="createDate" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit">
          </el-button>
          <el-button type="danger" icon="el-icon-delete">
          </el-button>
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
      total:0,
      listQuery: {
        page: 1,
        limit: 12,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      slClassificationOp:[
        '原材料','外购','表面处理','其它'
      ],
      slLevelOp:['A','B','C'],
      slStateOp:['启用','禁用'],
      tableData: []
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList() {
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
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
