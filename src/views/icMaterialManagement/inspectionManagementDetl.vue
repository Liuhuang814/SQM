<template>
    <div class="app-container">
        <el-tabs type="border-card" v-model="TabactiveName">
            <el-tab-pane label="检验单主信息" name="dzxx">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                        <el-form-item label="检验单编号" prop="inspectionNo">
                            <el-input v-model="ruleForm.inspectionNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="采购单号" prop="purchaseNo">
                            <el-input v-model="ruleForm.purchaseNo" clearable />
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
                        <el-form-item label="检验标准" prop="standardNo">
                            <el-input v-model="ruleForm.standardNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="批号" prop="batchNo">
                            <el-input v-model="ruleForm.batchNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="来料数量" prop="incomingNum">
                            <el-input v-model="ruleForm.incomingNum" clearable />
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item label="检验数量" prop="inspectNum">
                              <el-input v-model="ruleForm.inspectNum" clearable />
                          </el-form-item>
                      </el-col>
                    </el-row>

                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="检验项信息" name="hyxx">
              <el-collapse v-model="activeNames">
                <el-collapse-item name="1">
                  <template slot="title">
                    <span style="font-size:16px;color:#409eff">基本信息</span>
                  </template>
                  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                        <el-form-item label="检验单编号" prop="inspectionNo">
                            <el-input v-model="ruleForm.inspectionNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="采购单号" prop="purchaseNo">
                            <el-input v-model="ruleForm.purchaseNo" clearable />
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
                        <el-form-item label="检验标准" prop="standardNo">
                            <el-input v-model="ruleForm.standardNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="批号" prop="batchNo">
                            <el-input v-model="ruleForm.batchNo" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="来料数量" prop="incomingNum">
                            <el-input v-model="ruleForm.incomingNum" clearable />
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item label="检验数量" prop="inspectNum">
                              <el-input v-model="ruleForm.inspectNum" clearable />
                          </el-form-item>
                      </el-col>
                    </el-row>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template slot="title">
                    <span style="font-size:16px;color:#409eff">检验项信息</span>
                  </template>
                  <el-table
                    :data="tableData"
                    highlight-current-row
                    style="width: 100%"
                  >
                    <el-table-column label="序号" type="index" width="50" align="center" />
                    <el-table-column label="检验项目" prop="jyxm" align="center" />
                    <el-table-column label="检验类别" prop="jylb" align="center" />
                    <el-table-column label="标准值" prop="bzz" align="center" />
                    <el-table-column label="检验值" prop="jyz" align="center">
                      <el-table-column label="检验值1" prop="jyz1" align="center" />
                      <el-table-column label="检验值2" prop="jyz2" align="center" />
                      <el-table-column label="检验值3" prop="jyz3" align="center" />
                      <el-table-column label="检验值4" prop="jyz4" align="center" />
                      <el-table-column label="检验值6" prop="jyz5" align="center" />
                      <el-table-column label="检验值7" prop="jyz5" align="center" />
                      <el-table-column label="检验值8" prop="jyz5" align="center" />
                      <el-table-column label="检验值9" prop="jyz5" align="center" />
                      <el-table-column label="检验值10" prop="jyz5" align="center" />
                      <el-table-column label="检验值11" prop="jyz5" align="center" />
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template slot="title">
                    <span style="font-size:16px;color:#409eff">综合判定</span>
                  </template>
                  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px">
                    <el-row :gutter="20">
                        <el-col :span="8">
                        <el-form-item label="综合判定" prop="determine">
                            <el-radio-group v-model="ruleForm.determine">
                              <el-radio label="0">合格</el-radio>
                              <el-radio label="1">不合格</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="是否环保" prop="environmental">
                            <el-radio-group v-model="ruleForm.environmental">
                              <el-radio label="0">HSF环保</el-radio>
                              <el-radio label="1">HS非环保</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="环保标识是否齐全" prop="environmentalProtectionLabel">
                            <el-radio-group v-model="ruleForm.environmentalProtectionLabel">
                              <el-radio label="0">是</el-radio>
                              <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                        <el-form-item label="不良率" prop="rejectRatio">
                            <el-input v-model="ruleForm.rejectRatio" clearable >
                              <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="检验员" prop="inspectUserName">
                            <el-input v-model="ruleForm.inspectUserName" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="仓管员" prop="storeUserName">
                            <el-input v-model="ruleForm.storeUserName" clearable />
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                        <el-form-item label="物控核准" prop="materialApproval">
                            <el-input v-model="ruleForm.materialApproval" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="品质核准" prop="qualityApproval">
                            <el-input v-model="ruleForm.qualityApproval" clearable />
                        </el-form-item>
                        </el-col>
                        <el-col :span="8">
                        <el-form-item label="状态" prop="state">
                          <el-select v-model="ruleForm.state" placeholder="状态" style="width:100%" clearable class="input-item">
                            <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                          </el-select>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                          <el-form-item label="备注" prop="inspectNum">
                              <el-input v-model="ruleForm.inspectNum" clearable />
                          </el-form-item>
                      </el-col>
                    </el-row>
                    </el-form>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
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
      TabactiveName:'hyxx',
      slStateOp: [
        { label: '进行中', value: '0' },
        { label: '已完成', value: '1' }
      ],
      activeNames:['1','2','3'],
      rowObj:{},
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
      tableData: [
        {jyxm:'转轴长',jylb:'长',bzz:'1.5mm'},
        {jyxm:'转轴宽',jylb:'宽',bzz:'3.5cm'},
        {jyxm:'转轴高',jylb:'高',bzz:'5m'}
      ],
    }
  },
  mounted(){
    this.rowObj = JSON.parse(sessionStorage.getItem('inspectionManagementDetl'))
    if(JSON.stringify(this.rowObj) != '{}'){
      this.ruleForm = Object.assign({},this.rowObj);
    }
  },
  methods: {

  }
}
</script>
