<template>
  <div class="app-container">
    <el-button style="float:right" type="primary" plain>
      保存
    </el-button>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">基本信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
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
            <el-col :span="8">
              <el-form-item label="供应商分类" prop="supplierType">
                <el-select v-model="ruleForm.supplierType" clearable style="width:100%" placeholder="请选择供应商分类">
                  <el-option v-for="item in slClassificationOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="供应商级别" prop="supplierLevel">
                <el-select v-model="ruleForm.supplierLevel" clearable style="width:100%" placeholder="请选择供应商级别">
                  <el-option v-for="item in slLevelOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商分类" prop="state">
                <el-select v-model="ruleForm.state" clearable style="width:100%" placeholder="请选择供应商状态">
                  <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">供应商联系人</span>
        </template>
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50" align="center" />
          <el-table-column label="默认联系人" prop="mrlxr" align="center" />
          <el-table-column label="职位" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.zw" clearable />
            </template>
          </el-table-column>
          <el-table-column label="联系人" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.lxr" clearable />
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.sjh" clearable />
            </template>
          </el-table-column>
          <el-table-column label="邮箱" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.yx" clearable />
            </template>
          </el-table-column>
          <el-table-column label="地址" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.dz" clearable />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="text"> <span style="color:red" @click="del(row)">删除</span> </el-button>
              <el-button type="text" @click="setMrlxr(row)">设置默认联系人</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:100%;text-align:center">
          <el-button style="margin-top:8px" type="primary" plain icon="el-icon-plus" @click="addRow">添加一行</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">体系资质信息</span>
        </template>
        <el-table
          :data="tableData1"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="45" align="center" />
          <el-table-column label="资质类别" align="center" width="95">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.zzlb" clearable style="width:100%" placeholder="请选择资质类别">
                <el-option label="体系" value="0" />
                <el-option label="过程" value="1" />
                <el-option label="安全" value="2" />
                <el-option label="环境" value="3" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资质名称" width="120" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.zzmc" clearable style="width:100%" placeholder="请选择资质名称">
                <el-option label="TS16949" value="0" />
                <el-option label="IS09001" value="1" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="文件类型" width="120" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.wjlx" clearable style="width:100%" placeholder="请选择资质名称">
                <el-option label="环境协议" value="0" />
                <el-option label="质量保证协议" value="1" />
                <el-option label="采购协议" value="2" />
                <el-option label="保密协议" value="3" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资质证书" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.zzzs" clearable />
            </template>
          </el-table-column>
          <el-table-column label="有效期起始" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.qs" clearable />
            </template>
          </el-table-column>
          <el-table-column label="有效期截止" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.jz" clearable />
            </template>
          </el-table-column>
          <el-table-column label="完成人" width="65" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.wcr" clearable />
            </template>
          </el-table-column>
          <el-table-column label="最晚完成时间" width="95" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.zwwcsj" clearable />
            </template>
          </el-table-column>
          <el-table-column label="提醒人" width="65" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.txr" clearable />
            </template>
          </el-table-column>
          <el-table-column label="提醒期限" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.txqx" clearable />
            </template>
          </el-table-column>
          <el-table-column label="有效期" width="95" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.yxq" clearable style="width:100%" placeholder="请选择资质名称">
                <el-option label="有效" value="0" />
                <el-option label="过期" value="1" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="资质状态" width="95" align="center">
            <template slot-scope="{row,$index}">
              <el-select v-model="row.zzzt" clearable style="width:100%" placeholder="请选择资质名称">
                <el-option label="启用" value="0" />
                <el-option label="禁用" value="1" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="60" align="center">
            <template slot-scope="{row,$index}">
              <el-button type="text"> <span style="color:red" @click="del1(row)">删除</span> </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:100%;text-align:center">
          <el-button style="margin-top:8px" type="primary" plain icon="el-icon-plus" @click="addRow1">添加一行</el-button>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">其它附件</span>
        </template>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      tableData: [
        { mrlxr: '是', zw: '', lxr: '', sjh: '', yx: '', dz: '', id: '0' }
      ],
      tableData1: [
        { zzlb: '0', zzmc: '0', wjlx: '0', zzzs: '', qs: '', jz: '', wcr: '', zwwcsj: '', txr: '', txqx: '', yxq: '0', zzzt: '0' }
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
      ruleForm: {

      },
      rules: {
        supplierNo: { required: true, message: '请输入供应商编号', trigger: 'blur' },
        supplierName: { required: true, message: '请输入供应商名称', trigger: 'blur' },
        supplierType: { required: true, message: '请选择供应商分类', trigger: 'change' },
        supplierLevel: { required: true, message: '请选择供应商级别', trigger: 'change' },
        state: { required: true, message: '请选择供应商状态', trigger: 'change' }
      },
      i: 1,
      rowObj:{}
    }
  },
  mounted(){
    this.rowObj = JSON.parse(sessionStorage.getItem('supplierManagementdelt'))
    if(JSON.stringify(this.rowObj) != '{}'){
      this.ruleForm = Object.assign({},this.rowObj);
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    addRow() {
      this.tableData.push({ mrlxr: '否', zw: '', lxr: '', sjh: '', yx: '', dz: '', id: this.i++ })
    },
    addRow1() {
      this.tableData1.push({ zzlb: '0', zzmc: '0', wjlx: '0', zzzs: '', qs: '', jz: '', wcr: '', zwwcsj: '', txr: '', txqx: '', yxq: '0', zzzt: '0' })
    },
    setMrlxr(row) {
      this.tableData.forEach(element => {
        if (element.id == row.id) {
          element.mrlxr = '是'
        } else {
          element.mrlxr = '否'
        }
      })
    },
    del(row) {
      const index = this.tableData.findIndex(item => item.id == row.id)
      this.tableData.splice(index, 1)
    },
    del1(row) {
      const index = this.tableData1.findIndex(item => item.id == row.id)
      this.tableData1.splice(index, 1)
    }
  }
}
</script>
<style scoped>
</style>
