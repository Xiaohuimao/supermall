<template>
  <!-- ref/children父组件获取子组件的时候可以使用 -->
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
 // 第三方插件
  import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 使用此方法来获取wrapper的方式不太好，因为类的话可能重复，所以这里使用ref
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      // 使用此种方法，避免每个页面都监听，影响性能
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType ===3) {
      this.scroll.on('scroll',(position) => {
      // 这里子传父，使用自定义事件
      this.$emit('scroll', position)
    })
    }
    
    // 监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp');
    })
    }
  },
  methods: {
    scrollTo(x,y,time) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 完成上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      // 与，判断，如果this.scroll还不存在，就不调用后面的内容
      // （这里防止Home中调用refresh的时候，this.scroll还没有值而造成报错）
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>