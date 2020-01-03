<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll" 
    :pull-up-load = "true"
    @pullingUp = "loadMore"
    >
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control class="tab-control" 
        :titles="['流行','新款','精选']" @tabClick = "tabClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不能直接监听点击，如果要监听，需要在事件名后加.native -->
    <back-top @click.native="backClick" v-show = "isShowBackTop"/>
  </div>
</template>

<script>
  // 子组件
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop'
  // js代码（方法）导入
  import {getHomeMultidata,getHomeGoods} from 'network/home.js'


  export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // created中最好只留业务相关的东西，所以这里再methods中再进行封装
    created() {
      // 1,请求多个数据
      // 函数调用 -> 压入函数栈（保存函数调用过程中所有变量）
      // 函数调用结束 -> 弹出函数栈（释放函数所有的变量）
      // 请求banner数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /*
      事件监听相关的方法
      */ 
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      /*
      网络监听相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          // this.result = res
          // console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res)
          // for (let n of res) {
          //   this.goods.pop.list.push(n)
          // }
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>


<style scoped>
/* scoped为作用域，设置了scoped后，则样式只对当前页面元素起作用 */
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    /* 简单实现吸顶功能 */
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
    css3中的属性calc可设置相对父元素的百分比高度 
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
