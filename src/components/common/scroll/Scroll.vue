<template>
  <!-- ref/children父组件获取子组件的时候可以使用 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
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
    this.scroll.on('scroll',(position) => {
      // 这里子传父，使用自定义事件
      this.$emit('scroll', position)
    })

    // 监听上拉加载更多
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp');
    })
  },
  methods: {
    scrollTo(x,y,time) {
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>