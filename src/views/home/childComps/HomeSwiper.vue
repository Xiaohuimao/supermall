<template>
  <div>
    <swiper>
      <swiper-item v-for= "item in banners" :key='item.title'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load = "imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

  export default {
    name:'HomeSwiper',

    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      // 只监听一次方法
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
        
      }
    }
  }
</script>

<style>
</style>
