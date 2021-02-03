<template>
  <TarBar>
    <tar-bar-item  path="/home" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" />
      <div slot="item-text">首页</div>
    </tar-bar-item>
    <tar-bar-item  path="/category" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" />
      <div slot="item-text">分类</div>
    </tar-bar-item>
    <tar-bar-item  path="/shopcart" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" />
      <div slot="item-text">购物车</div>
    </tar-bar-item>
    <tar-bar-item  path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" />
      <div slot="item-text">我的</div>
    </tar-bar-item>
  </TarBar>
</template>

<script>
  import TarBar from '../../common/tarbar/TarBar.vue'
  import TarBarItem from '../../common/tarbar/TarBarItem.vue'
  export default {
    name: 'MainTarBar',
    components:{
      TarBar,
      TarBarItem
    }}
</script>

<style>
</style>
