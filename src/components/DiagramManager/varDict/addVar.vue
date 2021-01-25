<template>
  <div id="app-container">
    <div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="变量名称" prop="dataName">
          <el-input v-model="form.dataName" />
        </el-form-item>
        <el-form-item label="变量KEY" prop="dataKey">
          <el-input v-model="form.dataKey" />
        </el-form-item>
        <el-form-item label="租户" prop="tenantId">
          <el-input v-model="form.tenantId" />
        </el-form-item>
        <el-form-item label="变量类型" prop="dataType">
          <el-select v-model="form.dataType" placeholder="变量类型" clearable>
            <el-option
              v-for="(item) in dataTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="变量类型" prop="processData">
          <el-switch
            v-model="form.processData"
            :active-value="1"
            :inactive-value="0"
            active-text="流程变量"
            inactive-text="业务变量"
          />
        </el-form-item>
        <el-form-item label="状态" prop="validState">
          <el-switch
            v-model="form.validState"
            :active-value="1"
            :inactive-value="0"
            active-text="有效"
            inactive-text="无效"
          />
        </el-form-item>
        <el-form-item label="可编辑节点" prop="allowEditNodeId">
          <el-select v-model="form.allowEditNodeId" placeholder="变量类型" clearable>
            <el-option
              v-for="(item) in nodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="必须填写节点" prop="requiredNodeId">
          <el-select v-model="form.requiredNodeId" placeholder="变量类型" clearable>
            <el-option
              v-for="(item) in nodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="隐藏当前字段节点" prop="hiddenNodeId">
          <el-select v-model="form.hiddenNodeId" placeholder="变量类型" clearable>
            <el-option
              v-for="(item) in nodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序值" prop="sort">
          <el-input-number v-model="form.sort" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" :autosize="{minRows: 4, maxRows:10}" /></el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" @click="onSubmit"> {{ $t('table.confirm') }}</el-button>
          <el-button @click="onCancel"> {{ $t('table.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { insertVarDict } from '@/api/varDict'

export default {
  name: 'AddVar',
  components: { },
  props: {
    processId: {
      type: Number,
      required: true
    },
    bpmnModeler: {
      type: Object,
      required: true
    },
    processInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      form: {
        variableId: null,
        processId: this.processId,
        dataKey: null,
        dataName: null,
        dataType: null,
        checkRule: null,
        specialValue: null,
        specialValue2: null,
        processData: 1,
        allowEditNodeId: null,
        hiddenNodeId: null,
        requiredNodeId: null,
        remarks: null,
        tenantId: store.getters.tenantId,
        sort: 1,
        validState: 1
      },
      loading: false,
      rules: {
        dataName: [
          { required: true, message: '请输入变量名称', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        dataKey: [
          { required: true, message: '请输入变量KEY', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        dataType: [
          { required: true, message: '请选择变量类型', trigger: 'change' }
        ]
      },
      dataTypeMap: {
        'serializable': '对象',
        'integer': '整形',
        'string': '字符串',
        'date': '日期',
        'select': '下拉列表',
        'decimal': '浮点型',
        'table': '表格',
        'boolean': '布尔值'
      },
      dataTypeList: [
        {
          label: '对象',
          value: 'serializable'
        },
        {
          label: '整形',
          value: 'java.lang.Integer'
        },
        {
          label: '字符串',
          value: 'java.lang.String'
        },
        {
          label: '日期',
          value: 'date'
        },
        {
          label: '下拉列表',
          value: 'select'
        },
        {
          label: '浮点型',
          value: 'decimal'
        },
        {
          label: '布尔值',
          value: 'boolean'
        }
      ],
      nodeList: [],
      nodeMap: {}

    }
  },
  computed: {

  },
  watch: {
    watch: {
      bpmnModeler: {
        handler(newValue, oldValue) {
          this.getNodeList()
        },
        deep: true
      }
    }
  },
  mounted() {
    this.getNodeList()
  },
  created() {

  },
  methods: {
    getNodeList() {
      const that = this
      const nodeList = [{ 'value': 'all', 'label': '所有' }]
      const nodeMap = { 'all': '所有' }
      try {
        for (var index in that.bpmnModeler._definitions.$model.ids._seed.hats) {
          if (that.bpmnModeler._definitions.$model.ids._seed.hats[index].$type !== 'bpmn:UserTask') continue
          nodeList.push({
            'value': that.bpmnModeler._definitions.$model.ids._seed.hats[index].id,
            'label': that.bpmnModeler._definitions.$model.ids._seed.hats[index].name,
            'start': false })
          nodeMap[that.bpmnModeler._definitions.$model.ids._seed.hats[index].id] = that.bpmnModeler._definitions.$model.ids._seed.hats[index].name
        }
      } catch (e) {
        console.error(e)
      }
      that.nodeList = nodeList
      that.nodeMap = nodeMap
    },
    onSubmit() {
      const _this = this
      _this.loading = true
      _this.$refs['form'].validate((valid) => {
        if (valid) {
          const postData = _this.form
          insertVarDict(postData).then(response => {
            _this.$message.success('保存成功!')
            _this.$nextTick(() => {
              _this.loading = false
            })
            _this.$emit('close')
            _this.$emit('queryList')
          })
        } else {
          _this.$nextTick(() => {
            _this.loading = false
          })
          return
        }
      })
      this.$nextTick(() => {
        _this.loading = false
      })
    },
    onCancel() {
      const _this = this

      _this.$emit('close')
    }
  }

}
</script>

<style scoped>

</style>
