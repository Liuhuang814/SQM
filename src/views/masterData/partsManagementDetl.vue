<template>
  <div class="app-container">
    <el-button style="float:right;margin-bottom:9px" type="primary" plain>
      保存
    </el-button>
    <div style="clear:both"></div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">基本信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
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
              <el-form-item label="零件分类" prop="partType">
                <el-select v-model="ruleForm.partType" clearable style="width:100%" placeholder="请选择供应商状态">
                  <el-option v-for="item in slClassificationOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="state">
                <el-select v-model="ruleForm.state" clearable style="width:100%" placeholder="请选择供应商状态">
                  <el-option v-for="item in slStateOp" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" maxlength="200" show-word-limit v-model="ruleForm.remark" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图片">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
          <el-table-column label="客户编号" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.zw" clearable />
            </template>
          </el-table-column>
          <el-table-column label="客户姓名" align="center">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.lxr" clearable />
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
        { mrlxr: '是', zw: '', lxr: '', sjh: '', yx: '', dz: '', id: '0' }
      ],
      slClassificationOp: [
        { label: '原材料', value: '0' },
        { label: '半成品', value: '1' },
        { label: '成品', value: '2' }
      ],
      slStateOp: [
        { label: '启用', value: '0' },
        { label: '禁用', value: '1' }
      ],
      ruleForm: {

      },
      rules: {
        partName: { required: true, message: '请输入品名', trigger: 'blur' },
        specification: { required: true, message: '请输入产品规格', trigger: 'blur' },
        partType: { required: true, message: '请选择零件分类', trigger: 'change' },
        state: { required: true, message: '请选择状态', trigger: 'change' }
      },
      i: 1,
      rowObj:{}
    }
  },
  mounted(){
    this.rowObj = JSON.parse(sessionStorage.getItem('partsManagementDetl'))
    if(JSON.stringify(this.rowObj) != '{}'){
      this.ruleForm = Object.assign({},this.rowObj);
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }, 
    addRow() {
      this.tableData.push({ khbh: '否', khxm: '', id: this.i++ })
    },
    del(row) {
      const index = this.tableData.findIndex(item => item.id == row.id)
      this.tableData.splice(index, 1)
    },
  }
}
</script>
<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
