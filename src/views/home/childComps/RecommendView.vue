<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item" :key="item.sort">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name:'RecommendView',
    props:{
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend {
    display: flex;
    /* width: 100%; */
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: auto;
  }
  .recommend-item img {
    max-width: 100%;
    padding: 10px;

  }
</style>
