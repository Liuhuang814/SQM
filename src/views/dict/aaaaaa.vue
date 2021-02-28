<template>
  <div>
    <diagram-manager
      ref="diagramManager"
      :process-info.sync="processInfo"
      :new-process-diagram-xml.sync="diagramXml"
      :process-detail-id.sync="editDiagramDialog.data"
      @queryList="queryList"
      @close="closeDiagramDialog"
    />
  </div>
</template>
<script>
import diagramManager from '@/components/DiagramManager'
export default {
  components: {
    diagramManager
  },
  data() {
    return {
      processInfo: {},
      diagramXml: '',
      editDiagramDialog: {
        title: '流程设计器',
        visible: false,
        width: '',
        data: '',
        name: '流程设计器', // 组件名,
        loading: false,
        fullscreen: true,
        closeOnPressEscape: false
      }
    }
  },
  methods: {
    queryList() {

    },
    closeDiagramDialog() {

    }
  }
}
</script>
