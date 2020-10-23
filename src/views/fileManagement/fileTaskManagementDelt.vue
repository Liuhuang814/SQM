<template>
    <div class="app-container an-plan">
        <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">基本信息</span>
            </template>
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
               <el-col :span="8">
                <el-form-item label="文件编号" prop="taskNo">
                    <el-input v-model="ruleForm.taskNo" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="文件类型" prop="fileType">
                  <el-select v-model="ruleForm.fileType" style="width:100%" placeholder="文件类型" clearable class="input-item">
                    <el-option v-for="item in wjlxOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="供应商编号" prop="supplierNo">
                    <el-input v-model="ruleForm.supplier.supplierNo" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-input v-model="ruleForm.supplier.supplierName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="计划开始时间" prop="compStartDate">
                    <el-input v-model="ruleForm.compStartDate" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="计划完成时间" prop="compEndDate">
                    <el-input v-model="ruleForm.compEndDate" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="指派完成人" prop="compPeoName">
                    <el-input v-model="ruleForm.compPeoName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="指派审批人" prop="approverName">
                    <el-input v-model="ruleForm.approverName" clearable />
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="提醒天数" prop="dayNum">
                    <el-input v-model="ruleForm.dayNum" clearable />
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">完成文件</span>
            </template>
            <el-upload
              style="width:30%"
              multiple
              :file-list="[{name:'SQM 1.0版本_2019-10-23测试版.xlsx'}]">
            </el-upload>
        </el-collapse-item>
        <el-collapse-item name="3">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">审批记录</span>
            </template>
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="审批结果" prop="a" align="center" />
                <el-table-column label="审批建议" prop="b" align="center" />
                <el-table-column label="附件" prop="c" align="center" />
                <el-table-column label="审批时间" prop="d" align="center" />
            </el-table>
        </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      TabactiveName:'hyxx',
      wjlxOption: [
        { label: 'PPVP资料', value: '0' },
        { label: '承诺函', value: '1' },
        { label: '保证书', value: '2' },
        { label: 'IMDS', value: '3' },
        { label: 'ROSH报告', value: '4' },
        { label: '其它', value: '5' },
      ],
      activeNames:['1','2','3','4'],
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
        {a:'通过',b:'审批建议',c:'超捷SQM原型评审20190829.docx',d:'2019-10-28 19:51:48'}
      ]
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('fileTaskManagementDelt'))
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
