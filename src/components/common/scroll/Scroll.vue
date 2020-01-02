<template>
  <div class="wrapper">
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
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 使用此方法来获取wrapper的方式不太好，因为类的话可能重复
    this.scroll = new BScroll(document.querySelector('.wrapper'),{})
  }
}
</script>

<style>

</style>