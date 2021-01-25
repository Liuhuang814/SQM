<template>
  <div id="app-container">
    <div id="header" ref="header">
      <div>
        <ul>
          <li class="control">
            <a @click="handleOpen()">
              <input
                class="openFile"
                type="file"
                @change="onOpenFile($event)"
              >

              <i class="el-icon-folder-opened" />
              导入
            </a>
          </li>
          <li class="control">
            <a @click="handleSave()">
              <i class="el-icon-folder" />
              保存
            </a>
          </li>
          <li class="control">
            <a
              title="撤销"
              @click="handleUndo()"
            >
              <i class="undo" />
              撤销
            </a>
          </li>
          <li class="control">
            <a
              title="重做"
              @click="handleRedo()"
            >
              <i class="redo" />
              重做
            </a>
          </li>

          <li class="control">
            <a
              title="缩放到实际尺寸"
              @click="handleZoom()"
            >
              <i class="el-icon-aim" />
              缩放到实际尺寸
            </a>
          </li>
          <li class="control">
            <a
              title="放大"
              @click="handleZoom(0.1)"
            >
              <i class="el-icon-circle-plus-outline" />
              放大
            </a>
          </li>
          <li class="control">
            <a
              title="缩小"
              @click="handleZoom(-0.1)"
            >
              <i class="el-icon-remove-outline" />
              缩小
            </a>
          </li>
          <li class="control">
            <a
              title="下载BPMN流程图"
              @click="handleDownloadXml()"
            >
              <i class="el-icon-download" />
              下载BPMN流程图
            </a>
          </li>
          <li class="control">
            <a
              title="下载SVG图片"
              @click="handleDownloadSvg()"
            >
              <i class="el-icon-picture" />
              下载SVG图片
            </a>
          </li>
          <li class="control">
            <a
              title="全屏/退出"
              @click="handleFullScreen()"
            >
              <i class="el-icon-full-screen" />
              全屏/退出
            </a>
          </li>
          <li class="control">
            <a
              title="快捷键"
              @click="showShortcutKeys()"
            >
              <i class="keyboard" />
              快捷键
            </a>
          </li>
          <li class="control">
            <a
              title="自动排版"
              @click="autuLayout()"
            >
              <i class="autoAlign" />
              自动排版
            </a>
          </li>
          <li class="control">
            <a
              title="左对齐"
              @click="align('left')"
            >
              <i class="alignLeft" />
              左对齐
            </a>
          </li>
          <li class="control">
            <a
              type="button"
              title="水平对齐"
              @click="align('middle')"
            >
              <i class="alignMiddle" />
              水平对齐
            </a>
          </li>
          <li class="control">
            <a
              type="button"
              title="右对齐"
              @click="align('right')"
            >
              <i class="alignRight" />
              右对齐
            </a>
          </li>
          <li class="control">
            <a
              title="顶部对齐"
              @click="align('top')"
            >
              <i class="alignTop" />
              顶部对齐
            </a>
          </li>
          <li class="control">
            <a
              title="垂直对齐"
              @click="align('center')"
            >
              <i class="alignCenter" />
              垂直对齐
            </a>
          </li>
          <li class="control">
            <a
              title="底部对齐"
              @click="align('bottom')"
            >
              <i class="alignBottom" />
              底部对齐
            </a>
          </li>
          <li class="control">
            <a
              title="验证"
              @click="validateDiagrame('bottom')"
            >
              <i class="el-icon-check" />
              验证
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

// import { updateProcess } from '@/api/process'
import { insertOrUpdate } from '@/api/processDetail'

export default {
  name: 'DesignHeader',
  components: {

  },
  props: {
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

      state: {
        scale: 1 // 流程图比例
      },
      processDiagramXml: ''
    }
  },
  computed: {

  },
  mounted() {
  },
  methods: {
    /**
     * 下载xml/svg
     *  @param  type  类型  svg / xml
     *  @param  data  数据
     *  @param  name  文件名称
     */
    download(type, data, name) {
      let dataTrack = ''
      const a = document.createElement('a')

      switch (type) {
        case 'xml':
          dataTrack = 'bpmn'
          break
        case 'svg':
          dataTrack = 'svg'
          break
        default:
          break
      }

      var bpmnName =
        this.bpmnModeler._definitions.rootElements[0].name ||
        this.bpmnModeler._definitions.rootElements[0].id
      var filename = bpmnName + '.' + dataTrack

      name = name || `${filename}`

      a.setAttribute(
        'href',
        `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
      )
      a.setAttribute('target', '_blank')
      a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
      a.setAttribute('download', name)

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    // 导入xml文件
    handleOpenFile(e) {
      const that = this
      const file = e.target.files[0]
      const reader = new FileReader()
      let data = ''
      reader.readAsText(file)
      reader.onload = function(event) {
        data = event.target.result
        that.renderDiagram(data, 'open')
      }
    },

    // 保存
    handleSave() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          const nodeIdList = []
          try {
            for (var index in this.bpmnModeler._definitions.$model.ids._seed.hats) {
              if (this.bpmnModeler._definitions.$model.ids._seed.hats[index].$type === 'bpmn:Process') continue
              nodeIdList.push(this.bpmnModeler._definitions.$model.ids._seed.hats[index].id)
            }
          } catch (e) {
            console.error(e)
          }

          try {
            var nodeList = []
            for (var index2 in this.bpmnModeler.get('elementRegistry').getAll()) {
              if (this.bpmnModeler.get('elementRegistry').getAll()[index2].type === 'label' ||
              this.bpmnModeler.get('elementRegistry').getAll()[index2].type === 'bpmn:Process') continue
              // nodeList.push(this.$refs.panel.elementToNodeInfo(this.bpmnModeler.get('elementRegistry').getAll()[index2]))
            }
            console.log('nodeList:' + JSON.stringify(nodeList))
          } catch (e) {
            console.error(e)
          }

          if (!this.bpmnModeler.get('linting')._active) {
            this.bpmnModeler.get('linting').toggle()
            this.$message.warning('当前流程未校验，现自动开启校验，如果校验无误后，请再点击保存按钮！')
            return
          }
          const validateError = Number(this.bpmnModeler.get('linting')._button.innerText.split(' Errors')[0])
          console.log('validateError:' + validateError)
          if (validateError > 0) {
            this.$message.error('当前流程未通过校验，请修改后再保存！')
            // 先放开
            // return
          }

          const postData = {
            tenantId: this.processInfo.tenantId,
            processId: this.processInfo.processId,
            processDetailId: this.processInfo.processDetailId,
            processXml: xml.replace(/ns0:/g, 'flowable:')
          }

          insertOrUpdate(postData).then(response => {
            this.$message.success('保存成功!')
            this.$nextTick(() => {
              this.processInfo.processDetailId = response.data
              this.$emit('closeDiagramDialog')
              this.$emit('queryList')
            })
          })
        }
      })
    },
    // 前进
    handleRedo() {
      this.bpmnModeler.get('commandStack').redo()
    },

    // 后退
    handleUndo() {
      this.bpmnModeler.get('commandStack').undo()
    },

    // 对齐
    align(type) {
      const selection = this.bpmnModeler.get('selection').get()

      if (selection === 'undefined' || selection === null || selection === '' || selection.length === 0) {
        this.$message.error('选择排版节点为空，请选择需对齐具体节点！')
        return
      }
      this.bpmnModeler.get('alignElements').trigger(selection, type)
    },

    // 下载SVG格式
    handleDownloadSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        console.log('err：' + err)
        this.download('svg', data)
        this.processDiagramSvg = data
      })
    },

    // 下载XML格式
    handleDownloadXml() {
      this.bpmnModeler.saveXML({ }, (err, data) => {
        if (err) {
          this.$message.error(err)
        } else {
          this.download('xml', data.replace(/ns0:/g, 'flowable:'))
        }
      })
    },

    // 流程图放大缩小
    handleZoom(radio) {
      console.log('handleZoom () ')
      const newScale = !radio
        ? 1.0 // 不输入radio则还原
        : this.state.scale + radio <= 0.2 // 最小缩小倍数
          ? 0.2
          : this.state.scale + radio
      this.bpmnModeler.get('canvas').zoom(newScale)
      this.state.scale = newScale
    },

    handleOpen() {
      document.getElementsByClassName('openFile')[0].click()
    },
    onOpenFile(files) {
      this.handleOpenFile(files)
    },
    handleFullScreen() {
      const element = document.documentElement
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        // 否则，进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      // 改变当前全屏状态
      this.fullscreen = !this.fullscreen
    },
    showShortcutKeys() {
      const showcutKeysHtml =
        '	 <table>  ' +
        '        <tbody>  ' +
        '          <tr>  ' +
        '            <td>撤销</td>  ' +
        '            <td class="binding"><code>ctrl + Z</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>重做</td>  ' +
        '            <td class="binding"><code>ctrl + ⇧ + Z</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>全选</td>  ' +
        '            <td class="binding"><code>ctrl + A</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>滚动（垂直）</td>  ' +
        '            <td class="binding"><code>ctrl + Scrolling</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>滚动（水平）</td>  ' +
        '            <td class="binding"><code>ctrl + ⇧ + Scrolling</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>直接编辑</td>  ' +
        '            <td class="binding"><code>E</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>拖拽工具</td>  ' +
        '            <td class="binding"><code>H</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>自由套索工具</td>  ' +
        '            <td class="binding"><code>L</code></td>  ' +
        '          </tr>  ' +
        '          <tr>  ' +
        '            <td>空间移动工具</td>  ' +
        '            <td class="binding"><code>S</code></td>  ' +
        '          </tr>  ' +
        '        </tbody>  ' +
        '      </table>  '

      this.$alert(showcutKeysHtml, '快捷键', {
        dangerouslyUseHTMLString: true
      }).catch(e => e)
    },
    autuLayout() {
      this.getProcessDiagramXML()
      /*  const alignToOrigin = this.bpmnModeler.get('alignToOrigin')
      console.log('alignToOrigin:' + alignToOrigin)
      alignToOrigin.align() */
      var AutoLayout = require('bpmn-auto-layout')

      const autoLayout = new AutoLayout()

      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          (async() => {
            var layoutedDiagramXML = await autoLayout.layoutProcess(xml)

            console.log('layoutedDiagramXML:' + layoutedDiagramXML)
          })()
          // vkbeautify.xml(xml.replace(/ns0:/g, 'flowable:'))
        }
      })
    },
    getProcessDiagramXML() {
      if (this.bpmnModeler._customElements != null && this.bpmnModeler._customElements.length > 0) {
      // 将自定义的元素 加入到 _definitions

        this.bpmnModeler._definitions.rootElements[0].flowElements = this.bpmnModeler._definitions.rootElements[0].flowElements.concat(this.bpmnModeler._customElements[0])
      }

      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          this.$message.error(err)
        } else {
          this.processDiagramXml = xml
          // vkbeautify.xml(xml.replace(/ns0:/g, 'flowable:'))
        }
      })
    },
    getProcessDiagramSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        console.log('err：' + err)
        this.processDiagramSvg = data
      })
    },
    validateDiagrame() {
      this.bpmnModeler.get('linting').toggle()
    }
  }
}
</script>

<style lang="scss">

.control {
  position: relative;
  display: inline-block;
  padding: 0px 5px;
  list-style-type: none;
}

.control a {
  font-size: 14px;
  color: black;
}

.control button {
  padding: 0;
  outline: none;
  cursor: pointer;
  font-size: 22px;
  line-height: 26px;
  color: #555;
  background: none;
  border: none;

}

.control .openFile {
  display: none
}

.control.line:after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 16px;
  border-right: 1px solid #ddd
}

.control a i {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  font-style: none
}

.drop-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  padding: 50px;

  background: rgba(255, 255, 255, 0.96);

  z-index: 1000;
}

.drop-overlay .box {
  text-align: center;
  border: dashed 4px #ccc;
  border-radius: 20px;
  height: 100%;

  display: flex;
  align-content: middle;

  pointer-events: none;
}

.drop-overlay .label {
  font-size: 26px;
  color: #888;
  margin: auto;
}

.showBPMNXML {
  height: 100%;
  width: 100%;
  font-size: 14px;
}

pre {
  display: block;
  font-family: monospace;
  white-space: pre;
  margin: 1em 0px;
  height: 100%;
  width: 100%;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #fefefe;
  color: #545454;
  padding: 0.5em;
  height: 100%;
  width: 100%;
}

.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 200px;
}

.zoom {
  cursor: pointer;
  background: url("../../assets/diagram_images/zoom.svg") 0 0 no-repeat;
}

.zoomIn {
  cursor: pointer;
  background: url("../../assets/diagram_images/zoomIn.svg") 0 0 no-repeat;
}

.zoomOut {
  cursor: pointer;
  background: url("../../assets/diagram_images/zoomOut.svg") 0 0 no-repeat;
}

.undo {
  cursor: pointer;
  background: url("../../assets/diagram_images/undo.svg") 0 0 no-repeat;
}

.redo {
  cursor: pointer;
  background: url("../../assets/diagram_images/redo.svg") 0 0 no-repeat;
}

.save {
  cursor: pointer;
  background: url("../../assets/diagram_images/save.svg") 0 0 no-repeat;
}

.download {
  cursor: pointer;
  background: url("../../assets/diagram_images/download.svg") 0 0 no-repeat;
}

.image {
  cursor: pointer;
  background: url("../../assets/diagram_images/image.svg") 0 0 no-repeat;
}

.fullscreen {
  cursor: pointer;
  background: url("../../assets/diagram_images/fullscreen.svg");
}

.keyboard {
  cursor: pointer;
  background: url("../../assets/diagram_images/keyboard.svg");
}

.autoAlign {
  cursor: pointer;
  background: url("../../assets/diagram_images/autoAlign.svg");
}

.openFileIcon {
  cursor: pointer;
  background: url("../../assets/diagram_images/open.svg") 0 0 no-repeat;
}

.alignLeft {
  cursor: pointer;
  background: url("../../assets/diagram_images/left.svg") 0 0 no-repeat;
}

.alignCenter {
  cursor: pointer;
  background: url("../../assets/diagram_images/center.svg") 0 0 no-repeat;
}

.alignRight {
  cursor: pointer;
  background: url("../../assets/diagram_images/right.svg") 0 0 no-repeat;
}

.alignTop {
  cursor: pointer;
  background: url("../../assets/diagram_images/top.svg") 0 0 no-repeat;
}

.alignMiddle {
  cursor: pointer;
  background: url("../../assets/diagram_images/middle.svg") 0 0 no-repeat;
}

.alignBottom {
  cursor: pointer;
  background: url("../../assets/diagram_images/bottom.svg") 0 0 no-repeat;
}

.validate {
  cursor: pointer;
  background: url("../../assets/diagram_images/validate.svg") 0 0 no-repeat;
}

</style>

