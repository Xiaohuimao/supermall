<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info :param-info="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {itemListenerMixin} from 'common/mixin.js'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
    }
  },
  created() {
    // 1，保存传入的iid
    this.iid = this.$route.params.iid

    // 2，根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1,获取顶部轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2，获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3，创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4，保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5，获取商品的详情数据
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 6，取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3，请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    // 这里通过mixin（混入）的方式，来取到防抖函数，进行优化
    detailImageLoad() {
      this.newRefresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #ffffff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 2;
    background-color: #ffffff;
    
  }
  .content {
    /* calc(100%),父元素的百分百高度 */
    height: calc(100% - 44px);
  }
</style>