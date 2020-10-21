<template>
    <div class="app-container">
        <el-collapse v-model="activeNames">
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
                    <el-select v-model="ruleForm.supplierType" style="width:100%" placeholder="供应商分类" clearable class="input-item">
                        <el-option v-for="item in slClassificationOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                <el-form-item label="供应商级别" prop="supplierLevel">
                    <el-select v-model="ruleForm.supplierLevel" style="width:100%" placeholder="供应商级别" clearable class="input-item">
                        <el-option v-for="item in slLevelOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                <el-form-item label="供应商状态" prop="state">
                    <el-select v-model="ruleForm.state" style="width:100%" placeholder="供应商状态" clearable class="input-item">
                        <el-option v-for="item in slStateOp" :key="item.value+item.label" :label="item.label" :value="item.value" />
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
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="默认联系人" prop="a" align="center" />
                <el-table-column label="职位" prop="b" align="center" />
                <el-table-column label="联系人" prop="c" align="center" />
                <el-table-column label="手机号" prop="d" align="center" />
                <el-table-column label="邮箱" prop="e" align="center" />
                <el-table-column label="地址" prop="f" align="left" width="300" />
            </el-table>
        </el-collapse-item>
        <el-collapse-item name="3">
            <template slot="title">
            <span style="font-size:16px;color:#409eff">体系资质信息</span>
            </template>
            <el-table
                :data="tableData1"
                highlight-current-row
                style="width: 100%"
                >
                <el-table-column label="序号" type="index" width="50" align="center" />
                <el-table-column label="资质类别" prop="a" align="center" />
                <el-table-column label="资质名称" prop="b" align="center" />
                <el-table-column label="文件类型" prop="c" align="center" />
                <el-table-column label="资质证书" prop="d" align="center"  width="120"/>
                <el-table-column label="资质证书有效期起始" prop="e" align="center"  width="130"/>
                <el-table-column label="资质证书有效期截止" prop="f" align="center"  width="130"/>
                <el-table-column label="完成人" prop="g" align="center" />
                <el-table-column label="最晚完成时间" prop="h" align="center" />
                <el-table-column label="提醒人" prop="i" align="center" />
                <el-table-column label="提醒期限" prop="j" align="center" />
                <el-table-column label="有效性" prop="k" align="center" />
                <el-table-column label="资质状态" prop="l" align="center" />
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
      activeNames:['1','2','3'],
      rowObj:{},
      ruleForm: {
        supplierType:'0',
        supplierLevel:'0'
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
        {a:'是',b:'经理',c:'宋勉',d:'13162062572',e:'2537542901@qq.com',f:'上海市嘉定区安亭镇昌吉东路1011号'}
      ],
      tableData1: [
        {a:'体系',b:'TS16949',c:'质量保证协议',d:'ZL293567790013',e:'2019-06-06',f:'2024-07-31',
        g:'admin',h:'2020-11-13',i:'admin',j:'10',k:'有效',l:'启用'
        }
      ]
    }
  },
  mounted() {
    this.rowObj = JSON.parse(sessionStorage.getItem('qualificationManagementDelt'))
    if (JSON.stringify(this.rowObj) != '{}') {
      this.ruleForm = Object.assign({}, this.rowObj,{supplierType:'0',supplierLevel:'0'})
    }
  },
  methods: {

  }
}
</script>
