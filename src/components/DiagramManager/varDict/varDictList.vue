<template>
  <div id="app-container">
    <el-container style="width:100%;">
      <el-main>
        <div class="container-info">
          <div class="filter-container">
            <el-form :inline="true" :model="searchObject">
              <el-form-item label="变量名称">
                <el-input v-model="searchObject.dataName" :placeholder="searchObject.dataName" clearable />
              </el-form-item>
              <el-form-item label="变量KEY">
                <el-input v-model="searchObject.dataKey" :placeholder="searchObject.dataKey" clearable />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryList"> 查询</el-button>
                <el-button type="primary" @click="insertForm">新增</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-loading="loading" class="content-container">
            <el-table
              v-loading="loading"
              :data="variableData"
              border
              style="width: 100%"
              element-loading-text="Loading"
              highlight-current-row
            >

              <el-table-column align="center" label="编号" width="95">
                <template slot-scope="scope">
                  {{ (searchObject.pageIndex - 1 ) * searchObject.pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                prop="processData"
                label="变量类型"
                width="180"
                align="center"
              >
                <template slot-scope="scope" align="center">
                  <el-tag :type="scope.row.processData ? 'success' : 'info'">
                    {{ scope.row.processData ? '流程变量' : '普通变量' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="dataName"
                label="变量名称"
                width="180"
                align="center"
              />
              <el-table-column
                prop="dataKey"
                label="变量KEY"
                align="center"
                width="200"
              />
              <el-table-column
                label="数据类型"
                align="center"
              >
                <template slot-scope="scope">
                  {{ dataTypeMap[scope.row.dataType.split(/[ {( ]/)[0]] }}
                </template>
              </el-table-column>
              <el-table-column
                prop="allowEditUsertaskDesc"
                label="允许编辑节点"
                align="center"
              />
              <el-table-column
                prop="requiredUsertaskDesc"
                label="必须填写节点"
                align="center"
              />
              <el-table-column
                prop="notAllowReadUsertaskDesc"
                label="隐藏字段节点"
                align="center"
              />
              <el-table-column
                prop="specialValue"
                label="特殊值"
                align="center"
              />
              <el-table-column
                prop="sort"
                label="排序值"
                align="center"
              />
              <el-table-column label="租户" prop="tenantId" width="110" align="center" />

              <el-table-column label="状态" width="110" align="center">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.validState | statusFilter">
                    {{ statusMap[scope.row.validState] }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                align="center"
                width="200"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  {{ scope.row.remarks }}
                </template>
              </el-table-column>
              <el-table-column label="操作人" width="110" align="center">
                <template slot-scope="scope">
                  {{ scope.row.operatorName + '-' + scope.row.operatorId }}
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作时间" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.updateTime || scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="120"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="editVar(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="deleteVar(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-footer">
            <pagination v-show="varTotal>0" :total="varTotal" :page.sync="searchObject.pageIndex" :limit.sync="searchObject.pageSize" style="float:right;" @pagination="queryList" />
          </div>
          <div>
            <el-dialog
              v-if="showInsertDialog.visible"
              :title="showInsertDialog.title"
              :visible.sync="showInsertDialog.visible"
              :width="showInsertDialog.width"
              append-to-body
              center
              :before-close="handleClose"
            >
              <AddVar
                ref="insertForm"
                :process-info.sync="processInfo"
                :bpmn-modeler.sync="bpmnModeler"
                :process-id.sync="processInfo.processId"
                @queryList="queryList"
                @close="closeInsertForm"
              />
            </el-dialog>
            <el-dialog
              v-if="showUpdateDialog.visible"
              :title="showUpdateDialog.title"
              :visible.sync="showUpdateDialog.visible"
              :width="showUpdateDialog.width"
              append-to-body
              center
              :before-close="handleClose"
            >
              <UpdateVar
                ref="updateForm"
                :process-var.sync="showUpdateDialog.data"
                :process-info.sync="processInfo"
                :bpmn-modeler.sync="bpmnModeler"
                :process-id.sync="processInfo.processId"
                @queryList="queryList"
                @close="closeUpdateForm"
              />
            </el-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getList } from '@/api/varDict'
import Pagination from '@/components/Pagination'
import store from '@/store'
import AddVar from './addVar.vue'
import UpdateVar from './updateVar.vue'

export default {
  name: 'VarDict',
  components: { Pagination, AddVar, UpdateVar },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'info'
      }
      return statusMap[status]
    }
  },
  props: {
    processKey: {
      type: String,
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
      tempProcessKey: '',
      loading: false,

      variableData: [],
      varTotal: 0,
      searchObject: {
        pageIndex: 1,
        pageSize: 10,
        tenantId: '',
        dataKey: null,
        dataName: ''
      },
      dataTypeMap: {
        'serializable': '对象',
        'java.lang.Integer': '整形',
        'java.lang.String': '字符串',
        'date': '日期',
        'select': '下拉列表',
        'decimal': '浮点型',
        'boolean': '布尔值'
      },
      statusMap: { 1: '有效', 0: '失效' },
      showInsertDialog: {
        title: '新增变量',
        visible: false,
        width: '40%',
        name: '', // 组件名,
        loading: false,
        data: ''
      },
      showUpdateDialog: {
        title: '修改变量',
        visible: false,
        width: '40%',
        name: '', // 组件名,
        loading: false,
        data: ''
      },
      nodeList: [],
      nodeMap: {}

    }
  },
  computed: {

  },
  watch: {
    processKey: {
      handler(newValue, oldValue) {
        this.tempProcessKey = newValue
      },
      deep: true
    }
  },
  mounted() {

  },
  created() {
    this.tempProcessKey = this.processKey

    this.searchObject = {
      pageIndex: 1,
      pageSize: 10,
      dataKey: null,
      tenantId: store.getters.tenantId,
      dataName: '',
      processKey: this.tempProcessKey
    }
    this.queryList()
    this.getNodeList()
  },
  methods: {
    getNodeList() {
      const that = this
      that.loading = true
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
      that.$nextTick(() => {
        that.loading = false
      })
    },
    insertForm(data) {
      this.showInsertDialog.visible = true
      this.showInsertDialog.data = data
    },
    closeInsertForm() {
      this.showInsertDialog.visible = false
    },

    closeUpdateForm() {
      this.showUpdateDialog.visible = false
    },
    queryList() {
      const that = this
      that.loading = true
      const param = that.searchObject
      getList(param).then(response => {
        that.variableData = []
        const list = []
        for (var i in response.data.list) {
          var dict = response.data.list[i]
          var allowEditUsertaskList = this.splitNode(dict.allowEditNodeId)
          var notAllowReadUsertaskList = this.splitNode(dict.hiddenNodeId)
          var requiredUsertaskList = this.splitNode(dict.requiredNodeId)
          dict.allowEditUsertaskDesc = this.joinNodeDesc(allowEditUsertaskList)
          dict.notAllowReadUsertaskDesc = this.joinNodeDesc(notAllowReadUsertaskList)
          dict.requiredUsertaskDesc = this.joinNodeDesc(requiredUsertaskList)
          list.push(dict)
        }

        console.log(list)
        that.variableData = list
        that.varTotal = response.data.total
        that.$nextTick(() => {
          that.loading = false
        })
      }).catch(err => {
        console.error(err)
        this.$nextTick(() => {
          that.loading = false
        })
      })
    },
    editVar(row) {
      this.showUpdateDialog.data = row
      this.$nextTick(() => {
        this.showUpdateDialog.visible = true
      })
    },
    deleteVar(row) {

    },
    splitNode(str) {
      if (str === undefined || str === null || str === '') {
        return []
      }
      const array = []
      str.split(',').forEach(element => {
        if (element === undefined || element === null || element === '') return
        if (element === 'start') {
          // start 为特殊节点
          this.nodeList.forEach(item => {
            if (item.start) {
              element = item.value
              return
            }
          })
        }
        array.push(element)
      })
      return array
    },
    joinNodeDesc(list) {
      if (list === undefined || list === null) {
        return ''
      }
      const descList = []
      list.forEach(element => {
        if (element === undefined || element === null || element === '') return
        descList.push(this.nodeMap[element])
      })
      // console.log("descList.join(','):" + descList.join(','))
      return descList.join(',')
    },
    handleClose(done) {
      this.$confirm(this.$t('action.confirmClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }

  }

}
</script>

<style scoped>

</style>
