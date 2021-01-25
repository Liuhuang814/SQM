<template>
  <div>
    <el-form
      ref="formInsertForm"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item :label="$t('formList.formName')" prop="formName">
        <el-input v-model="form.formName" />
      </el-form-item>
      <el-form-item :label="$t('formList.formKey')" prop="formKey">
        <el-input v-model="form.formKey" />
      </el-form-item>
      <el-form-item :label="$t('formList.tenantId')" prop="tenantId">
        <el-input v-model="form.tenantId" />
      </el-form-item>
      <el-form-item :label="$t('formList.formType')" prop="formType">
        <el-select v-model="form.formType" :placeholder="$t('formList.formType')" clearable>
          <el-option value="-1" :label="$t('formList.placeSelect')">{{ $t('formList.placeSelect') }}</el-option>
          <el-option
            v-for="(item, index) in formTypeList"
            :key="index"
            :label="$t('formList.formType'+item.value)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('formList.validState')" prop="validState">
        <el-switch
          v-model="form.validState"
          :active-value="1"
          :inactive-value="0"
          :active-text="$t('formList.status1')"
          :inactive-text="$t('formList.status0')"
        />
      </el-form-item>

      <el-form-item :label="$t('formList.sort')" prop="sort">
        <el-input-number v-model="form.sort" />
      </el-form-item>
      <el-form-item :label="$t('formList.remarks')">
        <el-input v-model="form.remarks" type="textarea" :autosize="{minRows: 4, maxRows:10}" /></el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit"> {{ $t('table.confirm') }}</el-button>
        <el-button @click="onCancel"> {{ $t('table.cancel') }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>

import { insertForm } from '@/api/form'
// import deepClone from 'clone-deep'
import store from '@/store'

export default {
  name: 'FormInsertForm',

  props: {
    formInfo: {
      type: Object,
      require: true,
      default: null
    }
  },
  data() {
    return {
      form: {
        formId: null,
        formKey: null,
        formName: null,
        remarks: null,
        formData: null,
        formType: 1,
        tenantId: store.getters.tenantId,
        sort: 1,
        validState: 1
      },
      formTypeList: [{ label: 'PC', value: 1 }, { label: 'Mobile', value: 2 }],
      loading: false,
      rules: {
        formName: [
          { required: true, message: '请输入表单名称', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        formKey: [
          { required: true, message: '请输入表单KEY', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '请输入租户编号', trigger: 'blur' },
          { min: 1, message: '长度最少为1个字符', trigger: 'blur' }
        ],
        formType: [
          { required: true, message: '请选择表单类型', trigger: 'change' }
        ]

      }
    }
  },
  computed: {

  },
  watch: {
    formInfo: {
      handler(newValue, oldValue) {
        // this.form = deepClone(newValue)
        this.form.formName = oldValue.formName
        this.form.formData = oldValue.formData
        this.form.remarks = oldValue.remarks
        this.form.sort = oldValue.sort
      },
      deep: true
    }
  },
  mounted() {
    this.form.formData = this.formInfo.formData
    this.form.remarks = this.formInfo.remarks
    this.form.sort = this.formInfo.sort
  },
  created() {

  },
  methods: {

    onSubmit() {
      const _this = this
      _this.loading = true
      _this.$refs['formInsertForm'].validate((valid) => {
        if (valid) {
          const postData = _this.form
          insertForm(postData).then(response => {
            _this.$message.success('保存成功!')
            _this.$nextTick(() => {
              _this.loading = false
            })
            _this.$emit('closeInsertForm')
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

      _this.$emit('closeInsertForm')
    }
  }
}
</script>

<style scoped>
.el-form-item label:after {
        content: "";
        display: inline-block;
        width: 100%;
    }

    .el-form-item__label {
        text-align: justify;
        height: 50px;
    }

    .el-form-item.is-required .el-form-item__label:before {
        content: none !important;
    }
.el-drawer:focus {
    outline: none;
}

</style>
