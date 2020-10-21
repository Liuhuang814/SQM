<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="检验单主信息">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="采购单单号" prop="purchaseNo">
                <el-input v-model="ruleForm.purchaseNo" clearable />
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
              <el-form-item label="品名" prop="supplierName">
                <el-input v-model="ruleForm.supplierName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品规格" prop="supplierMobile">
                <el-input v-model="ruleForm.supplierMobile" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检验标准" prop="supplierFax">
                <el-input v-model="ruleForm.supplierFax" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="批号" prop="purchaseDate">
                <el-input v-model="ruleForm.purchaseDate" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来料数量" prop="userNo">
                <el-input v-model="ruleForm.userNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检验数量" prop="userName">
                <el-input v-model="ruleForm.userName" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="检验项信息" />
    </el-tabs>
    <!-- <el-steps :active="1" simple>
            <el-step title="检验单主信息" icon="el-icon-edit"></el-step>
            <el-step title="检验项信息" icon="el-icon-circle-check"></el-step>
        </el-steps> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      rowObj: {},
      ruleForm: {
      },
      rules: {
        standardNo: { required: true, message: '请输入标准编号', trigger: 'blur' },
        supplierNo: { required: true, message: '请输入供应商编号', trigger: 'blur' },
        supplierName: { required: true, message: '请输入供应商名称', trigger: 'blur' },
        partName: { required: true, message: '请输入品名', trigger: 'blur' },
        specification: { required: true, message: '请输入产品规格', trigger: 'blur' },
        state: { required: true, message: '请选择状态', trigger: 'change' }
      }
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('inspectionManagementDetl'))
    if (JSON.stringify(this.rowObj) != '{}') {
      this.ruleForm = Object.assign({}, this.rowObj)
    }
  },
  methods: {

  }
}
</script>
