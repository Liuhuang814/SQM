<template>
  <div>
    <!--    表格布局-->
    <template v-if="item.type === 'table'">
      <table border="1" style="border-collapse: collapse;" class="form-build-table">
        <tbody>
          <tr v-for="(tr,tri) in item.trs" :key="tri">
            <td
              v-for="(td,tdi) in tr.tds"
              :key="tdi"
              :width="100/(tr.tds.length)+'%'"
              :colspan="td.colspan"
              :rowspan="td.rowspan"
            >
              <FinalForm
                v-for="(item, i) in td.list"
                :key="i"
                :item="item"
                :dynamic-data="dynamicData"
                :layout="layout"
                :form-data="formData"
                :child-table-columns="childTableColumns"
                @clickFormButton="handleFormButton"
                @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
                @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <!--    表格布局结束-->
    <!--    格栅布局-->
    <template v-if="item.type ==='grid'">
      <div class="form-build-grid">
        <el-row
          :gutter="item.options.gutter"
        >
          <el-col
            v-for="(column, i) in item.columns"
            :key="i"
            :span="column.span"
          >
            <FinalForm
              v-for="(item, i) in column.list"
              :key="i"
              :item="item"
              :dynamic-data="dynamicData"
              :layout="layout"
              :disabled="disabled"
              :form-data="formData"
              :child-table-columns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
            />
          </el-col>
        </el-row>
      </div>
    </template>
    <!--    格栅布局结束-->
    <!--    子表-->
    <template v-else-if="item.type === 'childTable'">
      <el-table
        class="form-build-childTable"
        :data="formData[item.model]"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="(column,i) in item.list"
          :key="i"
          :label="column.label"
          min-width="170"
        >
          <template slot-scope="scope">
            <el-input
              v-if="column.type === 'input'"
              v-model="formData[item.model][scope.$index][column.model]"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :default-value="column.options.defaultValue"
              :type="column.options.hidden?'hidden':'input'"
              :disabled="disabled ? disabled : column.options.disabled"
              v-bind="{
                clearable:column.options.clearable,
              }"
            />
            <el-input
              v-if="column.type === 'text'"
              v-model="formData[item.model][scope.$index][column.model]"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :default-value="column.options.defaultValue"
              :type="column.options.hidden?'hidden':'textarea'"
              :rows="column.options.height"
              :disabled="column.options.disabled"
              v-bind="{
                clearable:column.options.clearable,
              }"
            />
            <el-input-number
              v-if="column.type === 'number'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.numberDefaultValue"
              :step="column.options.step"
              :style="'width:'+column.options.width+'%'"
              :min="column.options.min"
              :max="column.options.max"
              :precision="column.options.precision"
              :disabled="disabled ? disabled : column.options.disabled"
            />
            <el-cascader
              v-if="column.type === 'cascader'"
              v-model="formData[item.model][scope.$index][column.model]"
              :options="column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options"
              :props="{
                multiple:column.options.multiple
              }"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              collapse-tags
              :disabled="disabled ? disabled : column.options.disabled"
              :clearable="column.options.clearable"
            />
            <el-select
              v-if="column.type === 'select'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.defaultValue"
              :multiple="item.options.multiple"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :disabled="disabled ? disabled : column.options.disabled"
              :clearable="column.options.clearable"
            >
              <el-option
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :key="index"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
            <el-checkbox-group
              v-if="column.type === 'checkbox'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.checkboxDefaultValue"
              :min="column.options.chooseMin"
              :max="column.options.chooseMax"
              :disabled="disabled ? disabled : column.options.disabled"
            >
              <el-checkbox
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :key="index"
                :label="items.value"
              >
                {{ items.label }}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-if="column.type === 'radio'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.defaultValue"
              :disabled="disabled ? disabled : column.options.disabled"
            >
              <el-radio
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :key="index"
                :label="items.value"
              >
                {{ items.label }}
              </el-radio>
            </el-radio-group>
            <el-date-picker
              v-if="column.type === 'date'&&column.options.isChooseTimes==='2'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.rangeDefaultValue"
              :style="'width:'+column.options.width+'%'"
              :type="column.options.isChooseTimes?'daterange':'date'"
              :range-separator="column.options.rangeSeparator"
              :start-placeholder="column.options.startPlaceholder"
              :end-placeholder="column.options.endPlaceholder"
              :disabled="disabled ? disabled : column.options.disabled"
              :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
            />
            <el-date-picker
              v-if="column.type === 'date'&&column.options.isChooseTimes==='1'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.defaultValue"
              :style="'width:'+column.options.width+'%'"
              type="date"
              :placeholder="column.options.placeholder"
              :format="column.options.format"
              :value-format="column.options.valueFormat"
              :disabled="disabled ? disabled : column.options.disabled"
            />
            <el-time-picker
              v-if="column.type === 'time'"
              v-model="formData[item.model][scope.$index][column.model]"
              :style="'width:'+column.options.width+'%'"
              :is-range="column.options.isChooseTimes==='2'"
              :default-value="column.options.defaultValue"
              :range-separator="column.options.rangeSeparator"
              :start-placeholder="column.options.startPlaceholder"
              :end-placeholder="column.options.endPlaceholder"
              :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
              :disabled="disabled ? disabled : column.options.disabled"
            />
            <UploadFile
              v-if="column.type === 'uploadFile'"
              v-model="formData[item.model][scope.$index][column.model]"
              :warn-text="column.options.warnText"
              :button-text="column.options.buttonText"
              :style="'width:'+column.options.width+'%'"
              :action="column.options.action"
              :multiple="column.options.multiple"
              :limit="column.options.limit"
              :disabled="disabled ? disabled : column.options.disabled"
              :list-type="column.options.listType"
              :headers="column.options.headers?column.options.headers:{}"
              :data="column.options.data?column.options.data:{}"
              :name="column.options.name?column.options.name:''"
              @onSuccess="(response, file, fileList)=>{const model= column.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= column.model;$emit('beforeUpload', file, model)}"
            />
            <UploadImg
              v-if="column.type === 'uploadImg'"
              v-model="formData[item.model][scope.$index][column.model]"
              :style="'width:'+column.options.width+'%'"
              :action="column.options.action"
              :multiple="column.options.multiple"
              :limit="column.options.limit"
              :disabled="disabled ? disabled : column.options.disabled"
              :list-type="column.options.listType"
              :headers="column.options.headers?column.options.headers:{}"
              :data="column.options.data?column.options.data:{}"
              :name="column.options.name?column.options.name:''"
              @onSuccess="(response, file, fileList)=>{const model= column.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= column.model;$emit('beforeUpload', file, model)}"
            />
            <el-switch
              v-if="column.type === 'switch'"
              v-model="formData[item.model][scope.$index][column.model]"
              :default-value="column.options.switchValue"
              :active-text="column.options.activeText"
              :inactive-text="column.options.inactiveText"
              :disabled="column.options.disabled"
            />
            <div
              v-if="column.type === 'slider'"
              class="block"
            >
              <el-slider
                v-model="formData[item.model][scope.$index][column.model]"
                :default-value="column.options.numberDefaultValue"
                :disabled="disabled ? disabled : column.options.disabled"
                :show-input="column.options.showInput"
                :step="column.options.step"
              />
            </div>
            <div
              v-if="column.type==='p'"
              :style="'width:'+column.options.width+'%; margin: 0; padding: 0; line-height: 20px; '"
              v-text="column.label"
            />
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              icon="el-icon-minus"
              circle
              class="table-button"
              @click="handleDelete(scope.$index, formData[item.model], item.model)"
            />
            <el-button
              icon="el-icon-plus"
              circle
              class="table-button"
              @click="handleAdd(scope.$index,formData[item.model], item.model)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--    子表结束-->
    <!--    卡片布局-->
    <template v-else-if="item.type === 'card'">
      <div>
        <el-card class="card-layout">
          <div slot="header">
            <span>{{ item.label }}</span>
          </div>
          <div>
            <FinalForm
              v-for="(items, i) in item.list"
              :key="i"
              :item="items"
              :dynamic-data="dynamicData"
              :layout="layout"
              :form-data="formData"

              :disabled="disabled"
              :child-table-columns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{const model= items.model; $emit('onSuccess',response, file, fileList, model)}"
              @beforeUpload="(file)=>{const model= items.model;$emit('beforeUpload', file, model)}"
            />
          </div>
        </el-card>
      </div>
    </template>
    <!--    卡片布局结束-->
    <template v-else>
      <el-form-item
        :prop="item.model"
        :label="item.options.hidden||item.type==='tMKeditor'||isLabel?'':item.label"
        :required="item.rules?item.rules[0].required:false"
        :label-width="item.type==='tMKeditor'||isLabel?'0px':layout.labelWidth+'%'"
        :style="item.type==='tMKeditor'?'overflow:hidden':''"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="formData[item.model]"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :default-value="item.options.defaultValue"
          :type="item.options.hidden?'hidden':'input'"
          :disabled="disabled ? disabled : item.options.disabled"

          v-bind="{
            clearable:item.options.clearable,
          }"
        />
        <el-input
          v-if="item.type === 'text'"
          v-model="formData[item.model]"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :default-value="item.options.defaultValue"
          :type="item.options.hidden?'hidden':'textarea'"
          :rows="item.options.height"
          :disabled="disabled ? disabled : item.options.disabled"
          v-bind="{
            clearable:item.options.clearable,
          }"
        />
        <el-input-number
          v-if="item.type === 'number'"
          v-model="formData[item.model]"
          :default-value="item.options.numberDefaultValue"
          :step="item.options.step"
          :style="'width:'+item.options.width+'%'"
          :min="item.options.min"
          :max="item.options.max"
          :precision="item.options.precision"
          :disabled="disabled ? disabled : item.options.disabled"
        />
        <el-cascader
          v-if="item.type === 'cascader'"
          v-model="formData[item.model]"
          :options="item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options"
          :props="{
            multiple:item.options.multiple
          }"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          collapse-tags
          :disabled="disabled ? disabled : item.options.disabled"
          :clearable="item.options.clearable"
        />
        <el-select
          v-if="item.type === 'select'"
          v-model="formData[item.model]"
          :multiple="item.options.multiple"
          :default-value="item.options.multiple?item.options.multipleDefaultValue:item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :disabled="disabled ? disabled : item.options.disabled"
          :clearable="item.options.clearable"
        >
          <el-option
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.label"
            :value="items.value"
          />
        </el-select>
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="formData[item.model]"
          :default-value="item.options.checkboxDefaultValue"

          :disabled="disabled ? disabled : item.options.disabled"
        >
          <el-checkbox
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.value"
          >
            {{ items.label }}
          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="formData[item.model]"
          :default-value="item.options.defaultValue"
          :disabled="disabled ? disabled : item.options.disabled"
        >
          <el-radio
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.value"
          >
            {{ items.label }}
          </el-radio>
        </el-radio-group>
        <el-date-picker
          v-if="item.type === 'date'&&item.options.isChooseTimes==='2'"
          v-model="formData[item.model]"
          :default-value="item.options.rangeDefaultValue"
          :style="'width:'+item.options.width+'%'"
          :type="item.options.isChooseTimes?'daterange':'date'"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :disabled="disabled ? disabled : item.options.disabled"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        />
        <el-date-picker
          v-if="item.type === 'date'&&item.options.isChooseTimes==='1'"
          v-model="formData[item.model]"
          :default-value="item.options.defaultValue"
          :style="'width:'+item.options.width+'%'"
          type="date"
          :placeholder="item.options.placeholder"
          :format="item.options.format"
          :value-format="item.options.valueFormat"
          :disabled="disabled ? disabled : item.options.disabled"
        />
        <el-time-picker
          v-if="item.type === 'time'"
          v-model="formData[item.model]"
          :style="'width:'+item.options.width+'%'"
          :is-range="item.options.isChooseTimes==='2'"
          :default-value="item.options.defaultValue"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
          :disabled="disabled ? disabled : item.options.disabled"
        />
        <UploadFile
          v-if="item.type === 'uploadFile'"
          v-model="formData[item.model]"
          :warn-text="item.options.warnText"
          :button-text="item.options.buttonText"
          :style="'width:'+item.options.width+'%'"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="disabled ? disabled : item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
          @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
        />
        <UploadImg
          v-if="item.type === 'uploadImg'"
          ref="b"
          v-model="formData[item.model]"
          :style="'width:'+item.options.width+'%'"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="disabled ? disabled : item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{const model= item.model; $emit('onSuccess',response, file, fileList, model)}"
          @beforeUpload="(file)=>{const model= item.model;$emit('beforeUpload', file, model)}"
        />
        <div
          v-if="item.type === 'super'"
        >
          <a
            :href="'https://'+item.options.url"
            target="_blank"
          >
            {{ item.options.defaultValue }}
          </a>
        </div>
        <el-divider
          v-if="item.type === 'divider'"
          content-position="left"
        >
          {{ item.label }}
        </el-divider>
        <TMKeditor
          v-if="item.type==='tMKeditor'"
          ref="KEditor"
          :style="`width:${item.options.width}%`"
          :record="item"
          :disabled="true"
        />
        <el-switch
          v-if="item.type === 'switch'"
          v-model="formData[item.model]"
          :default-value="item.options.switchValue"
          :active-text="item.options.activeText"
          :inactive-text="item.options.inactiveText"
          :disabled="disabled ? disabled : item.options.disabled"
        />
        <div
          v-if="item.type === 'slider'"
          class="block"
        >
          <el-slider
            v-model="formData[item.model]"
            :default-value="item.options.numberDefaultValue"
            :disabled="disabled ? disabled : item.options.disabled"
            :show-input="item.options.showInput"
            :step="item.options.step"
          />
        </div>
        <div
          v-if="item.type==='p'"
          :style="'width:'+item.options.width+'%; margin: 0; padding: 0; line-height: 20px; '"
          v-text="item.label"
        />
        <el-button
          v-if="item.type === 'button'"
          :type="item.options.buttonType"
          :disabled="disabled ? disabled : item.options.disabled"
          :style="'margin-left:'+ item.options.width + '%'"
          @click="handleFormButton(item.options.handle)"
        >{{ item.label }}</el-button>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import UploadImg from '../formDesignTCD/components/uploadImg'
import UploadFile from '../formDesignTCD/components/uploadFile'
export default {
  name: 'FinalForm',
  components: { UploadImg, UploadFile },
  props: {
    typeList: {
      type: Array,
      default: () => [
        'button',
        'divider',
        'card',
        'grid',
        'table',
        'alert',
        'html',
        'p',
        'divider'
      ]
    },
    dynamicData: {
      type: Object,
      default: () => {}
    },
    childTableColumns: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    },
    layout: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    isLabel() {
      // 判断是否是需要label的Node
      return this.typeList.includes(this.item.type)
    }
  },
  methods: {
    handleFormButton(type) {
      this.$emit('clickFormButton', type)
    },
    handleAdd(index, array, model) {
      // 操作子表添加一行
      let item = {}
      this.childTableColumns.forEach((child, i) => {
        if (model === child.model) {
          item = JSON.parse(JSON.stringify(child))
        }
      })
      delete item.model
      array.splice(index, 0, item)
    },
    handleDelete(index, array) {
      // 操作子表删除指定行
      if (array.length > 1) {
        array.splice(index, 1)
      }
    }
  }
}
</script>
