export default {
  data() {
    return {
      resizeConditionBarTimer: null,
      extraConditionWidth: []
    }
  },
  watch: {
    $route(route) {
      this.extraConditionWidth = []
      // 这里使用1秒debounce很重要 由于切换路由使用了transition
      // 在动画结束前会有两个相同id的元素同时存在
      // 而且getElementById会取到老的那一个
      this.$_debounceResizeHandler()
    },
    collapse(val) {
      this.$_debounceResizeHandler()
    }
  },
  mounted() {
    this.$_debounceResizeHandler()
    window.addEventListener('resize', this.$_debounceResizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_debounceResizeHandler)
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_resizeHandler() {
      const conditionBar = document.getElementById('area-condition-bar')
      if (!conditionBar) {
        return
      }
      const pageWidth = conditionBar.offsetWidth - 5 // 额外减5避免边界情况
      const areaCondition = document.getElementById('area-condition') // 条件域
      const areaConditionWidth = areaCondition.offsetWidth // 条件域宽度，
      let areaOperationWidth = document.getElementById('area-operation').offsetWidth // 操作域宽度
      const dropdownArea = document.getElementById('dropdown') // 更多条件域
      const moreCondition = document.getElementById('moreCondition') // 更多条件弹出层
      if (areaConditionWidth + areaOperationWidth < pageWidth) {
        // 没有放不下的condition
        if (dropdownArea.style.display !== 'inline-block') {
          dropdownArea.style.display = 'none'
          return
        } else {
          // 确认是否有放得下的condition从更多条件中拿回来
          let numsToGetOut = 0
          this.extraConditionWidth.forEach((ex, exIdx) => {
            const correction = (exIdx === this.extraConditionWidth.length - 1) ? 75 : 0
            if (areaConditionWidth + ex + areaOperationWidth - correction < pageWidth) {
              numsToGetOut++
            }
          })
          for (let idx = 0; idx < numsToGetOut; idx++) {
            areaCondition.appendChild(
              moreCondition.removeChild(moreCondition.childNodes[0])
            )
            const toMinus = this.extraConditionWidth.shift()
            this.extraConditionWidth = this.extraConditionWidth.map(v => v - toMinus)
          }
          if (moreCondition.childNodes.length === 0) {
            // 所有condition拿出来后不显示更多条件
            dropdownArea.style.display = 'none'
          }
        }
      } else {
        // 有放不下的condition
        if (dropdownArea.style.display !== 'inline-block') {
          dropdownArea.style.display = 'inline-block'
          areaOperationWidth += 75 // 加上“更多条件”的宽度（75px）
        }
        let sum = 0

        let sumInMoreCondition = 0 // 更多条件中检索条件的个数
        const appendOrInsert = moreCondition.childNodes.length === 0
        let firstMoreCondition = null
        const lastLength = this.extraConditionWidth.length
        if (!appendOrInsert) {
          firstMoreCondition = moreCondition.childNodes[0]
        }
        Array.from(
          areaCondition.getElementsByClassName('condition')
        ).forEach((item, index) => {
          sum += item.offsetWidth
          if (sum + areaOperationWidth >= pageWidth) {
            if (appendOrInsert) {
              this.extraConditionWidth.push(
                item.offsetWidth + (sumInMoreCondition === 0 ? 0 : this.extraConditionWidth[this.extraConditionWidth.length - 1])
              )
              moreCondition.appendChild(item.parentNode.removeChild(item))
            } else {
              if (sumInMoreCondition === 0) {
                this.extraConditionWidth.splice(
                  0,
                  0,
                  item.offsetWidth
                )
              } else {
                this.extraConditionWidth.splice(
                  sumInMoreCondition,
                  0,
                  this.extraConditionWidth[sumInMoreCondition - 1] + item.offsetWidth
                )
              }
              moreCondition.insertBefore(item.parentNode.removeChild(item), firstMoreCondition)
            }
            sumInMoreCondition++
          }
        })
        // 修正this.extraConditionWidth最后一项
        if (!appendOrInsert) {
          const j = this.extraConditionWidth.length - lastLength
          for (let last = 0; last < lastLength; last++) {
            this.extraConditionWidth[j + last] += this.extraConditionWidth[j - 1]
          }
        }
        // 更多条件中的样式调整，如果大于4个检索，则两列展示，否则一列展示
        if (sumInMoreCondition >= 4) {
          moreCondition.setAttribute('class', 'moreConditionColumns')
        } else {
          moreCondition.removeAttribute('class')
        }
      }
    },
    // 给resize回调添加1秒debounce
    $_debounceResizeHandler() {
      if (this.resizeConditionBarTimer) {
        clearTimeout(this.resizeConditionBarTimer)
      }
      this.resizeConditionBarTimer = setTimeout(() => {
        this.$_resizeHandler()
      }, 1100)
    }
  }
}
