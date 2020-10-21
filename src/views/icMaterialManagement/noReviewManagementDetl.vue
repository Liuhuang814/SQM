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
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="表单编号" prop="reviewNo">
                <el-input v-model="ruleForm.reviewNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品名" prop="partName">
                <el-select v-model="ruleForm.partName" style="width:100%" placeholder="采购单种类" clearable class="input-item">
                  <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="材料" prop="supplierNo">
                <el-input v-model="ruleForm.supplierNo" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="产品规格" prop="specification">
                <el-input v-model="ruleForm.specification" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批号" prop="batchNo">
                <el-input v-model="ruleForm.batchNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发现时间" prop="findTime">
                <el-input v-model="ruleForm.findTime" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="不良开始时间" prop="startTime">
                <el-input v-model="ruleForm.startTime" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="不良产生时间段开始" prop="createTimeStart">
                <el-input v-model="ruleForm.createTimeStart" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="不良产生时间段结束" prop="createTimeEnd">
                <el-input v-model="ruleForm.createTimeEnd" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="检验数量" prop="inspectNum">
                <el-input v-model="ruleForm.inspectNum" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="不良数量" prop="rejectNum">
                <el-input v-model="ruleForm.rejectNum" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="不良率" prop="rejectRatio">
                <el-input v-model="ruleForm.rejectRatio" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否横向追溯" prop="purchaseDate">
                   <el-radio-group v-model="ruleForm.horizontalTraceability">
                        <el-radio label="0">是</el-radio>
                        <el-radio label="1">否</el-radio>
                    </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可疑品数量" prop="suspectedNum">
                <el-input v-model="ruleForm.suspectedNum" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="累计不良数量" prop="accumulativeRejectNum">
                <el-input v-model="ruleForm.accumulativeRejectNum" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="发现人员" prop="userName">
                <el-input v-model="ruleForm.userName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="生产责任者" prop="productResponsibleUser">
                <el-input v-model="ruleForm.productResponsibleUser" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品质责任者" prop="qualityResponsibleUser">
                <el-input v-model="ruleForm.qualityResponsibleUser" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="发现地点" prop="findSite">
                <el-select v-model="ruleForm.findSite" clearable style="width:100%" placeholder="请选择状态">
                  <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">不合格信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="不合格描述" prop="disqualificationDescription">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.disqualificationDescription" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="相关责任部门" prop="responsibleDept">
                <el-input v-model="ruleForm.responsibleDept" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担当" prop="duserName">
                <el-select v-model="ruleForm.duserName" style="width:100%" placeholder="采购单种类" clearable class="input-item">
                  <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="createTimeEnd">
                <el-input v-model="ruleForm.createTimeEnd" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">生产部填写</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="不良产生原因" prop="rejectReason">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.rejectReason" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="现有改进措施" prop="improvementMeasure">
                <el-input v-model="ruleForm.improvementMeasure" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担当" prop="puserName">
                <el-select v-model="ruleForm.puserName" style="width:100%" placeholder="采购单种类" clearable class="input-item">
                  <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="createTimeEnd">
                <el-input v-model="ruleForm.createTimeEnd" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">工程部填写</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="155px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="现行加工工艺是否合理" prop="purchaseNo">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">合理</el-radio>
                    <el-radio label="1">不合理</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否需要调整加工工艺" prop="purchaseType">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调整后状态" prop="adjustedState">
                <el-input v-model="ruleForm.adjustedState" clearable />
              </el-form-item>
            </el-col>
           </el-row>
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="新工艺预计下发时间" prop="createTimeEnd">
                <el-input v-model="ruleForm.createTimeEnd" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已制品处理方案" prop="productionTreatmentPlan">
                <el-input v-model="ruleForm.productionTreatmentPlan" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担当" prop="euserName">
                <el-input v-model="ruleForm.euserName" clearable />
              </el-form-item>
            </el-col>
           </el-row> 
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="日期" prop="findTime">
                <el-input v-model="ruleForm.findTime" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">业务部或物控部</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否影响出货" prop="purchaseNo">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">不影响</el-radio>
                    <el-radio label="1">影响</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否需要补货" prop="purchaseType">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">需要</el-radio>
                    <el-radio label="1">不需要</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="建议处理方案" prop="bscheme">
                <el-input v-model="ruleForm.bscheme" clearable />
              </el-form-item>
            </el-col>
           </el-row>
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="担当" prop="buserName">
                <el-input v-model="ruleForm.buserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="findTime">
                <el-input v-model="ruleForm.findTime" clearable />
              </el-form-item>
            </el-col>
           </el-row> 
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">厂长</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="厂长意见" prop="fopinion">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.fopinion" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否纳入考核" prop="purchaseNo">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认" prop="fuserName">
                <el-input v-model="ruleForm.fuserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="findTime">
                <el-input v-model="ruleForm.findTime" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
        <el-collapse-item name="7">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">品质部</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="是否发生过客诉/是否重复发生" prop="purchaseNo">
                <el-radio-group v-model="ruleForm.horizontalTraceability">
                    <el-radio label="0">是</el-radio>
                    <el-radio label="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最终处置方案" prop="qscheme">
                <el-input v-model="ruleForm.qscheme" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="措施/工艺验证" prop="craftVerify">
                <el-input v-model="ruleForm.craftVerify" clearable />
              </el-form-item>
            </el-col>
          </el-row>
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="确认" prop="quserName">
                <el-input v-model="ruleForm.quserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="startTime">
                <el-input v-model="ruleForm.startTime" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="8">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">综合判定</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
           <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="综合判定" prop="reviewResult">
                <el-select v-model="ruleForm.reviewResult" style="width:100%" placeholder="综合判定" clearable class="input-item">
                    <el-option v-for="item in zhpdOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      zhpdOption:[
        { label: '运行', value: '0' },
        { label: '拒收', value: '1' },
        { label: '退货', value: '2' },
        { label: '挑选', value: '3' },
        { label: '特采', value: '4' }
      ],
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '外购件', value: '1' },
        { label: '表面处理', value: '2' }
      ],
      imageUrl: '',
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8'],
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
      rowObj: {}
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('noReviewManagementDetl'))
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
