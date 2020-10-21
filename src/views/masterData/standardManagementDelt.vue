<template>
  <div class="app-container">
    <el-button style="float:right;margin-bottom:9px" type="primary" plain>
      保存
    </el-button>
    <div style="clear:both" />
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">基本信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="标准编号" prop="standardNo">
                <el-input v-model="ruleForm.standardNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商编号" prop="supplierNo">
                <el-input v-model="ruleForm.supplierNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="ruleForm.supplierName" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="零件编号" prop="partNo">
                <el-input v-model="ruleForm.partNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品名" prop="partName">
                <el-input v-model="ruleForm.partName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品规格" prop="specification">
                <el-input v-model="ruleForm.specification" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="材料" prop="materials">
                <el-input v-model="ruleForm.materials" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="state">
                <el-select v-model="ruleForm.state" clearable style="width:100%" placeholder="请选择状态">
                  <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">客户信息</span>
        </template>
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column label="检验项目" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.jyxm" clearable />
            </template>
          </el-table-column>
          <el-table-column label="检验类别" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.jylb" clearable />
            </template>
          </el-table-column>
          <el-table-column label="公差" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.gc" clearable />
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.zt" clearable style="width:100%" placeholder="请选择状态">
                <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="text"> <span style="color:red" @click="del(row)">删除</span> </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:100%;text-align:center">
          <el-button style="margin-top:8px" type="primary" plain icon="el-icon-plus" @click="addRow">添加一行</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      activeNames: ['1', '2', '3', '4'],
      tableData: [
        {}
      ],
      slStateOp: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ],
      ruleForm: {
      },
      rules: {
        standardNo: { required: true, message: '请输入标准编号', trigger: 'blur' },
        supplierNo: { required: true, message: '请输入供应商编号', trigger: 'blur' },
        supplierName: { required: true, message: '请输入供应商名称', trigger: 'blur' },
        partName: { required: true, message: '请输入品名', trigger: 'blur' },
        specification: { required: true, message: '请输入产品规格', trigger: 'blur' },
        state: { required: true, message: '请选择状态', trigger: 'change' }
      },
      i: 1,
      rowObj: {}
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('standardManagementDelt'))
    if (JSON.stringify(this.rowObj) != '{}') {
      this.ruleForm = Object.assign({}, this.rowObj)
    }
  },
  methods: {
    addRow() {
      this.tableData.push({ id: this.i++ })
    },
    del(row) {
      const index = this.tableData.findIndex(item => item.id == row.id)
      this.tableData.splice(index, 1)
    }
  }
}
</script>
<style>
</style>
