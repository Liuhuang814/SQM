<template>
  <div class="app-container eva-rule">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="font-size:16px;color:#409eff">基本信息</span>
        </template>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="规则编号：" prop="partNo">
                C-PD-003
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规则名称：" prop="partName">
                供应商月度绩效评价方法
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="总分：" prop="specification">
                100
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
          <el-table-column label="评分项目" prop="pfxm" align="left" width="170"/>
          <el-table-column label="评分占比" prop="pfzb" align="left" width="70"/>
          <el-table-column label="评分算法" prop="pfsf" align="left" show-overflow-tooltip/>
          <el-table-column label="公式描述" prop="gsms" align="left" show-overflow-tooltip/>
          <el-table-column label="备注" prop="bz" align="left"  width="500" show-overflow-tooltip/>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      activeNames: ['1', '2'],
      tableData: [
        {pfxm:'进料检验得分',pfzb:'15',pfsf:'(1-退货批数/交货总批数)',gsms:'(1-退货批数/交货总批数)*15',bz:'数据源：取来料不良汇总中，处理方式是‘退货’的批数'},
        {pfxm:'制程检验得分	',pfzb:'10',pfsf:'(1-制程检验不合格数/交货总批数)',gsms:'(1-制程检验不合格数/交货总批数)*10',bz:''},
        {pfxm:'HSF(环境管理体系)得分	',pfzb:'5',pfsf:'',gsms:'',bz:'HSF根据供应商供货的情况考核，扣分按照每交一批非HSF产品扣2分，扣完为止'},
        {pfxm:'客诉处理得分	',pfzb:'10',pfsf:'(1-不及时回复客诉次数/客诉总次数)',gsms:'(1-不及时回复客诉次数/客诉总次数)*10',bz:''},
        {pfxm:'交期	',pfzb:'10',pfsf:'(1-迟交批数/应交付总批数)',gsms:'(1-迟交批数/应交付总批数)*10',bz:''},
        {pfxm:'产品过程开发	',pfzb:'5',pfsf:'(1-不及时批数/开发批数)',gsms:'(1-不及时批数/开发批数)*5',bz:''},
        // {pfxm:'供方评审',pfzb:'10',pfsf:'',gsms:'审核得分*10%',bz:''},
        {pfxm:'价格',pfzb:'10',pfsf:'',gsms:'',bz:'低于市场价10%，10分；低于5-10%，8分；低于0-5%，6分；等同，4分；高于5%，0分'},
        {pfxm:'超额运费',pfzb:'5',pfsf:'',gsms:'',bz:'月度小于等于1次，大于一次扣5分'},
        {pfxm:'包装/标识',pfzb:'5',pfsf:'',gsms:'',bz:'每发生一次异常扣一分，扣完为止'},
        {pfxm:'让步接收',pfzb:'5',pfsf:'',gsms:'',bz:'每发生一次让步接收扣一分，扣完为止'},
        {pfxm:'配合度',pfzb:'5',pfsf:'(100-总扣分数)',gsms:'(100-总扣分数)*5%',bz:'	依照供应商是否配合公司紧急生产时之协助事项进行考核；扣分标准依供应商的协调性是否良好进行，每当协调无法进行时，扣5分'},
        {pfxm:'体系认证',pfzb:'5',pfsf:'',gsms:'',bz:'通过IATF16949:2016管理体系认证5分；只通过ISO9001:2015体系认证3分；没有通过认证的0分'},
      ],
    }
  },
  mounted(){
  },
  methods: {
    
  }
}
</script>
<style>
    .eva-rule .el-collapse-item__content{
        padding-bottom: 0;
    }
</style>
