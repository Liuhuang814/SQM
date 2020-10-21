<template>
  <div class="app-container">
    <el-button style="float:right;margin-bottom:9px" type="primary" plain>
      保存
    </el-button>
    <div style="clear:both"></div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">基本信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="采购单单号" prop="purchaseNo">
                <el-input v-model="ruleForm.purchaseNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购种类" prop="purchaseType">
                <el-select v-model="ruleForm.purchaseType" style="width:100%" placeholder="采购单种类" clearable class="input-item">
                    <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商编号" prop="supplierNo">
                <el-input v-model="ruleForm.supplierNo" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商名称" prop="supplierName">
                <el-input v-model="ruleForm.supplierName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话" prop="supplierMobile">
                <el-input v-model="ruleForm.supplierMobile" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="supplierFax">
                <el-input v-model="ruleForm.supplierFax" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
              <el-col :span="8">
              <el-form-item label="订单日期" prop="purchaseDate">
                <el-input v-model="ruleForm.purchaseDate" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务员编号" prop="userNo">
                <el-input v-model="ruleForm.userNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务员名称" prop="userName">
                <el-input v-model="ruleForm.userName" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="采购状态" prop="state">
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
          <el-table-column label="ERP物料编码" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.a" clearable />
            </template>
          </el-table-column>
          <el-table-column label="品名" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.b" clearable />
            </template>
          </el-table-column>
          <el-table-column label="产品规格" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.c" clearable />
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.d" clearable />
            </template>
          </el-table-column>
          <el-table-column label="单位" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.e" clearable style="width:100%">
                  <el-option label="Kg" value="Kg" />
                  <el-option label="k" value="k" />
                  <el-option label="psc" value="psc" />
                </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.f" clearable />
            </template>
          </el-table-column>
          <el-table-column label="是否含税" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.g" clearable style="width:100%">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
                </el-select>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.h" clearable />
            </template>
          </el-table-column>
          <el-table-column label="交货日期" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.i" clearable />
            </template>
          </el-table-column>
          <el-table-column label="回复日期" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.j" clearable />
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
    slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '外购件', value: '1' },
        { label: '表面处理', value: '2' }
      ],
      imageUrl: '',
      activeNames: ['1', '2', '3', '4'],
      tableData: [
        {}
      ],
      slStateOp: [
        { label: '未关闭', value: '0' },
        { label: '已关闭', value: '1' }
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
      rowObj:{}
    }
  },
  mounted(){
    this.rowObj = JSON.parse(sessionStorage.getItem('purchaseOrderMaentDetl'))
    if(JSON.stringify(this.rowObj) != '{}'){
      this.ruleForm = Object.assign({},this.rowObj);
    }
  },
  methods: {
    addRow() {
      this.tableData.push({ id: this.i++ })
    },
    del(row) {
      const index = this.tableData.findIndex(item => item.id == row.id)
      this.tableData.splice(index, 1)
    },
  }
}
</script>
<style>
</style>
