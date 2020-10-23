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
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="投诉单编号" prop="invoiceNo">
                <el-input v-model="ruleForm.invoiceNo" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="品名" prop="partName">
                <el-input v-model="ruleForm.part.partName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品规格" prop="specification">
                <el-input v-model="ruleForm.part.specification" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="批号" prop="batchNo">
                <el-input v-model="ruleForm.batchNo" clearable />
              </el-form-item>
            </el-col>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="发现时间" prop="findTime">
                <el-input v-model="ruleForm.findTime" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="发生阶段" prop="createStage">
                <el-select v-model="ruleForm.createStage" style="width:100%" placeholder="发生阶段" clearable class="input-item">
                    <el-option v-for="item in fsjdOption" :key="item.value+item.label" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投诉日期" prop="invoiceDate">
                <el-input v-model="ruleForm.invoiceDate" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="计划结束日期" prop="planFinishDate">
                <el-input v-model="ruleForm.planFinishDate" clearable />
              </el-form-item>
            </el-col>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="不良率" prop="rejectRatio">
                <el-input v-model="ruleForm.rejectRatio" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人" prop="apprUserName">
                <el-input v-model="ruleForm.apprUserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="问题描述" prop="disqualificationDescription">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="4" v-model="ruleForm.disqualificationDescription" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">其它信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="临时措施" prop="provisionalMeasures">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="4" v-model="ruleForm.provisionalMeasures" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人" prop="puserName">
                <el-input v-model="ruleForm.puserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成时间" prop="updateDate">
                <el-input v-model="ruleForm.updateDate" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="根本原因" prop="primaryCause">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="4" v-model="ruleForm.primaryCause" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人" prop="auserName">
                <el-input v-model="ruleForm.auserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成时间" prop="supplierNo">
                <el-input v-model="ruleForm.supplierNo" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="长期措施" prop="longtermMeasure">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="4" v-model="ruleForm.longtermMeasure" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人" prop="cuserName">
                <el-input v-model="ruleForm.cuserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成时间" prop="planFinishDate">
                <el-input v-model="ruleForm.planFinishDate" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="同意关闭" prop="agreeClose">
                <el-input type="textarea" maxlength="200" show-word-limit :rows="4" v-model="ruleForm.agreeClose" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人" prop="auserName">
                <el-input v-model="ruleForm.auserName" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="完成时间" prop="invoiceDate">
                <el-input v-model="ruleForm.invoiceDate" clearable />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">8D文件</span>
        </template>
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            list-type="picture">
        </el-upload>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">审批记录</span>
        </template>
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column label="审批结果" prop="spjg" align="center" />
          <el-table-column label="审批建议" prop="spjy" align="center" />
          <el-table-column label="附件" prop="fj" align="center" />
          <el-table-column label="审批时间" prop="spsj" align="center" />
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {name: 'QQ图片20191022130845.jpg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'SQM 1.0版本_2019-10-23测试版.jpg', url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'}
      ],
      fsjdOption: [
        { label: '制程检验', value: '2' },
        { label: '客诉', value: '3' },
        { label: '进行检验', value: '1' }
      ],
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '外购件', value: '1' },
        { label: '表面处理', value: '2' }
      ],
      imageUrl: '',
      activeNames: ['1', '2', '3', '4'],
      tableData: [
        {spjg:'通过',spjy:'投诉单审批建议:更好的为人民服务',fj:'超捷SQM原型评审20190829.docx',spsj:'2019-10-28 19:33:03'}
      ],
      slStateOp: [
        { label: '未关闭', value: '0' },
        { label: '已关闭', value: '1' }
      ],
      ruleForm: {
        part:{},
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
      i: 1,
      rowObj: {}
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('complaintFormManagementDetl'))
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
