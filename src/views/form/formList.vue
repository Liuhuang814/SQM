<template>
  <div class="app-container">
    <div class="container-info">
      <div class="filter-container">
        <el-form :inline="true" :model="searchObject">
          <el-form-item :label="$t('formList.formName')">
            <el-input v-model="searchObject.formName" :placeholder="$t('formList.formName')" clearable />
          </el-form-item>
          <el-form-item :label="$t('formList.formKey')">
            <el-input v-model="searchObject.formKey" :placeholder="$t('formList.formKey')" clearable />
          </el-form-item>
          <el-form-item :label="$t('formList.status')">
            <el-select v-model="searchObject.status" :placeholder="$t('formList.status')" clearable>
              <el-option value="-1">{{ $t('formList.placeSelect') }}</el-option>
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="$t('formList.status'+item.value)"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">{{ $t('formList.query') }}</el-button>
            <el-button type="primary" @click="insertForm(null,'insert')">{{ $t('formList.addForm') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-loading="listLoading" class="content-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          :element-loading-text="$t('loading.text')"
          border
          fit
          highlight-current-row
        >
          <el-table-column align="center" :label="$t('formList.id')" width="95">
            <template slot-scope="scope">
              {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formName')" align="center">
            <template slot-scope="scope">
              {{ scope.row.formName }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formKey')" align="center">
            <template slot-scope="scope">
              {{ scope.row.formKey }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.formType')" width="110" align="center">
            <template slot-scope="scope">
              {{ formTypeMap[scope.row.formType] }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.tenantId')" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.tenantId }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.validState')" width="110" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.validState | statusFilter">
                {{ statusMap[scope.row.validState] }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('formList.remarks')"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              {{ scope.row.remarks }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('formList.operatorName')" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row.operatorName + '-' + scope.row.operatorId }}
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('formList.updateTime')" width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime || scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('formList.action')" width="450" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-row :gutter="2">
                <el-col :span="5">
                  <el-button type="primary" size="mini" plain @click="editForm(scope.row)">{{ $t('formList.update') }}</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button type="success" size="mini" plain @click="handlePreview(scope.row)">{{ $t('formList.preview') }}</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button type="info" size="mini" plain @click="showFormDesign(scope.row)">{{ $t('formList.design') }}</el-button>
                </el-col>

                <el-col :span="4">
                  <el-button type="warning" size="mini" plain @click="insertForm(scope.row,'copy')">{{ $t('formList.copy') }}</el-button>
                </el-col>
                <el-col :span="5">
                  <el-button type="danger" size="mini" plain @click="deleteForm(scope.row)">{{ $t('formList.deleted') }}</el-button>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="page-footer">
        <pagination v-show="total>0" :total="total" :page.sync="searchObject.pageIndex" :limit.sync="searchObject.pageSize" style="float:right;" @pagination="queryList" />
      </div>

      <div>
        <!-- 预览 -->
        <!-- <previewModal ref="previewModal" /> -->

        <el-dialog
          v-if="formPreViewDialog.visible"
          :title="formPreViewDialog.title"
          :visible.sync="formPreViewDialog.visible"
          :width="formPreViewDialog.width"
          :fullscreen="formPreViewDialog.fullscreen"
          :close-on-press-escape="formPreViewDialog.closeOnPressEscape"
          :modal-append-to-body="false"
          center
        >
          <PreFormView ref="preFormView" :form-info.sync="formPreViewDialog.data" :width="formPreViewDialog.width" @closePreViewDialog="closePreViewDialog" />
        </el-dialog>

        <el-drawer
          v-if="showUpdateDialog.visible"

          :title="showUpdateDialog.title"
          :visible.sync="showUpdateDialog.visible"
          :direction="showUpdateDialog.direction"
          append-to-body
          custom-class="drawer"
          :before-close="handleClose"
        >
          <div class="custom_drawer__content">
            <updateForm ref="updateForm" :form-info.sync="showUpdateDialog.data" @queryList="queryList" @closeUpdateForm="closeUpdateForm" />
          </div>
        </el-drawer>

        <el-dialog
          v-if="showInsertDialog.visible"

          :title="showInsertDialog.title"
          :visible.sync="showInsertDialog.visible"
          :width="showInsertDialog.width"
          center
          :before-close="handleClose"
        >
          <insertForm ref="insertForm" :form-info.sync="showInsertDialog.data" @queryList="queryList" @closeInsertForm="closeInsertForm" />
        </el-dialog>

        <el-dialog
          v-if="formDesignDialog.visible"

          :title.sync="formDesignDialog.title"
          :visible.sync="formDesignDialog.visible"
          :width="formDesignDialog.width"
          :fullscreen="formDesignDialog.fullscreen"
          :close-on-press-escape="formDesignDialog.closeOnPressEscape"
          :modal-append-to-body="false"
          center
          :before-close="handleClose"
          @close="closeFormDesignDialog"
        >
          <FormDesign ref="formDesign" :form-info.sync="formDesignDialog.data" @queryList="queryList" @closeFormDesignDialog="closeFormDesignDialog" />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { generateTitle } from '@/utils/i18n'
import { getList, deleteForm } from '@/api/form'
import Pagination from '@/components/Pagination'
import updateForm from './update.vue'
import insertForm from './insert.vue'
import FormDesign from '@/components/FormDesign'
import PreFormView from '@/components/PreFormView'

export default {
  components: {
    Pagination,
    // previewModal,
    updateForm,
    insertForm,
    FormDesign,
    PreFormView },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      searchObject: {
        formKey: '',
        formName: '',
        status: null,
        tenantId: store.getters.tenantId,
        pageIndex: 1,
        pageSize: 10
      },
      paginationObj: {
        pageSize: 1,
        rowCount: 10
      },
      statusList: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '失效',
          value: 0
        }
      ],
      statusMap: { 1: '有效', 0: '失效' },
      formTypeMap: { 1: 'PC', 2: 'mobile' },
      list: [],
      listLoading: true,
      total: 0,
      previewOptions: {
        width: 850
      },
      showUpdateDialog: {
        // 弹窗组件传递数据
        title: '修改',
        visible: false,
        width: '',
        name: '修改', // 组件名,
        loading: false,
        data: '',
        fullscreen: false,
        closeOnPressEscape: false,
        direction: 'rtl'
      },
      showInsertDialog: {
        title: '新增表单',
        visible: false,
        width: '',
        name: '', // 组件名,
        loading: false
      },
      formDesignDialog: {
        title: '表单设计器',
        visible: false,
        width: '',
        name: '表单设计器', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      },
      formPreViewDialog: {
        title: '预览',
        visible: false,
        width: '850',
        name: '预览', // 组件名,
        loading: false,
        fullscreen: false,
        closeOnPressEscape: false
      }
    }
  },
  created() {
    this.searchObject = {
      formKey: '',
      formName: '',
      status: null,
      tenantId: store.getters.tenantId,
      pageIndex: 1,
      pageSize: 10
    }
    this.queryList()
  },
  mounted() {
  },
  methods: {
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    editForm(data) {
      this.showUpdateDialog.data = data
      this.showUpdateDialog.visible = true
      console.log('this.showUpdateDialog.data:' + JSON.stringify(this.showUpdateDialog.data))
    },
    showFormDesign(data) {
      this.formDesignDialog.data = data
      this.formDesignDialog.visible = true
    },
    insertForm(data, operater) {
      this.showInsertDialog.visible = true
      this.showInsertDialog.data = data
      if (operater === 'copy') {
        this.showInsertDialog.title = '复制表单'
      }
    },
    closeInsertForm() {
      this.showInsertDialog.visible = false
    },
    closeUpdateForm() {
      this.showUpdateDialog.visible = false
    },
    closeFormDesignDialog() {
      this.$nextTick(() => {
        this.formDesignDialog.visible = false
      })
    },
    closePreViewDialog() {
      this.formPreViewDialog.visible = false
    },
    handlePreview(row) {
      // 打开预览模态框
      this.formPreViewDialog.data = row
      this.formPreViewDialog.visible = true
    },
    generateTitle,
    queryList() {
      this.listLoading = true
      var param = this.searchObject
      getList(param).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.$nextTick(() => {
          this.listLoading = false
        })
      })
    },
    deleteForm(form) {
      this.$confirm(this.$t('action.confirmDelete'))
        .then(_ => {
          const postData = {
            formKey: form.formKey,
            tenantId: form.tenantId
          }
          const _that = this
          _that.listLoading = true
          deleteForm(postData).then(response => {
            _that.listLoading = false
            this.$message('删除成功')
            this.$nextTick(() => {
              this.listLoading = false
            })
            _that.queryList()
          }).catch(function(error) {
            _that.listLoading = false
            console.error(error)
          })
        })
        .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-drawer:focus {
    outline: none;
}
.custom_drawer__content{
    margin: 5px 20px;
    align-content: center;
}
.el-drawer__header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #72767b;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 32px;
    padding: 20px 20px 0;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
}
</style>

