<template>
    <div class="app-container an-plan">
        <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">基本信息</span>
            </template>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="供应商编号" prop="supplierNo">
                    <el-input v-model="ruleForm.supplier.supplierNo" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-input v-model="ruleForm.supplier.supplierName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="审核类别" prop="reviewCategory">
                    <el-select v-model="ruleForm.reviewCategory" style="width:100%" placeholder="供应商分类" clearable class="input-item">
                        <el-option v-for="item in shlbOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="资质类别" prop="quaCategory">
                    <el-select v-model="ruleForm.quaCategory" style="width:100%" placeholder="资质类别" clearable class="input-item">
                      <el-option v-for="item in zzlbOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="资质名称" prop="quaName">
                    <el-input v-model="ruleForm.quaName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="证书有效期开始" prop="cerValidityStart">
                    <el-input v-model="ruleForm.cerValidityStart" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="证书有效期截止" prop="cerValidityEnd">
                    <el-input v-model="ruleForm.cerValidityEnd" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="联系人" prop="linkmanName">
                    <el-input v-model="ruleForm.linkmanName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="联系方式(邮件)" prop="email">
                    <el-input v-model="ruleForm.email" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="主要产品" prop="mainProducts">
                    <el-input v-model="ruleForm.mainProducts" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="审核方式" prop="state">
                    VDA6.5
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="计划制定人" prop="plannerUserName">
                    <el-input v-model="ruleForm.plannerUserName" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="计划制定时间" prop="projectApprDate">
                    <el-input v-model="ruleForm.projectApprDate" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="计划审批人" prop="projectApprUserName">
                    <el-input v-model="ruleForm.projectApprUserName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="结果审批人" prop="resultApprUserName">
                    <el-input v-model="ruleForm.resultApprUserName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="16">
                <el-form-item label="联系地址" prop="address">
                    <el-input type="textarea" rows="3" v-model="ruleForm.address" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">审核计划审批记录</span>
            </template>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="审批结果" prop="a" align="center" />
                <el-table-column label="审批建议" prop="b" align="left" />
                <el-table-column label="审批时间" prop="c" align="center" />
            </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">审核结果</span>
            </template>
           <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="评审结果" prop="auditResult">
                    <el-input v-model="ruleForm.auditResult" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="审核完成日期" prop="auditFinishDate">
                    <el-input v-model="ruleForm.auditFinishDate" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="下次审核日期" prop="nextAuditDate">
                    <el-input v-model="ruleForm.nextAuditDate" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="整改完成日期" prop="reformFinishDate">
                    <el-input v-model="ruleForm.reformFinishDate" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="不符合项个数" prop="completeReform">
                    <el-input v-model="ruleForm.completeReform" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="评审建议" prop="actualAdvice">
                    <el-input type="textarea" :rows="3" v-model="ruleForm.actualAdvice" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="4">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">审核报告</span>
            </template>
            <el-upload
            style="width:30%"
              multiple
              :file-list="[{name:'表面处理采购单导入.xlsx'}]">
            </el-upload>
        </el-collapse-item>
        <el-collapse-item name="5">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">不符合项报告</span>
            </template>
            <el-upload
            style="width:30%"
              multiple
              :file-list="[{name:'SQM 1.0版本_2019-10-25测试版（以标记）.xlsx'}]">
            </el-upload>
        </el-collapse-item>
        <el-collapse-item name="6">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">整改报告</span>
            </template>
            <el-upload
            style="width:30%"
              multiple
              :file-list="[{name:'SQM 1.0版本_2019-10-23测试版.xlsx'}]">
            </el-upload>
        </el-collapse-item>
        <el-collapse-item name="7">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">整改证据</span>
            </template>
            <el-upload
              style="width:30%"
              multiple
              :file-list="[{name:'表面处理采购单导入.xlsx'}]">
            </el-upload>
        </el-collapse-item>
        <el-collapse-item name="5">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">体系资质信息</span>
            </template>
            <el-table
                :data="tableData1"
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="审批结果" prop="a" align="center" />
                <el-table-column label="审批建议" prop="b" align="left" />
                <el-table-column label="审批时间" prop="c" align="center" />
            </el-table>
        </el-collapse-item>
        </el-collapse>
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
      shlbOption: [
        { label: '原材料', value: '0' },
        { label: '紧固件', value: '1' },
        { label: '表面处理', value: '2' },
        { label: '其它', value: '3' }
      ],
      zzlbOption: [
        { label: '体系', value: '体系' },
        { label: '过程', value: '过程' },
        { label: '安全', value: '安全' },
        { label: '环境', value: '环境' }
      ],
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
      slStateOp: [
        { label: '进行中', value: '0' },
        { label: '已完成', value: '1' }
      ],
      activeNames:['1','2','3','4','5','6','7','8'],
      rowObj:{},
      ruleForm: {
        supplierType:'0',
        supplierLevel:'0',
        supplier:{}
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
        {a:'通过',b:'年度审核计划评审建议',c:'2019-10-28 19:44:42'}
      ],
      tableData1: [
        {a:'通过',b:'审核计划结果审批评审意见上海艺嘉金属制品有限公司',c:'2019-10-28 19:46:41'}
      ]
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('annualAuditPlanDelt'))
    if (JSON.stringify(this.rowObj) != '{}') {
      this.ruleForm = Object.assign({}, this.rowObj,{supplierType:'0',supplierLevel:'0'})
    }
  },
  methods: {

  }
}
</script>
<style scope>
  .an-plan .el-collapse-item__content>div{
    margin-top: -32px;
  }
</style>
