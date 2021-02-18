<template>
  <div class="cart">
	  <nav-bar class="nav-bar">
		  <div slot="center">购物车({{cartLength}})</div>
	  </nav-bar>
	  <!-- 商品列表 商品数据源头是加入购物车动作之后 具体操作在mutation.js里面-->
	  <cart-list class="cart-list" :cart-list1="cartList"></cart-list>
	  
	<!--  底部工具栏 -->
	<cart-bottom-bar></cart-bottom-bar>
	
  </div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
	import CartList from './childCompos/cartList.vue'
	import cartBottomBar from './childCompos/cartBottomBar.vue'
	
	import {mapGetters} from 'vuex'
	export default{
		name:"Shopcart",
		components:{
			NavBar,
			CartList,
			cartBottomBar
		},
		computed:{
			// ...mapGetters({
			// 	length:'cartLength',
			// 	list:'cartList'
				
			// })
			...mapGetters(['cartList','cartLength'])
		// cartList() {
		// 			    return this.$store.getters.cartList
		// 	      },
		// cartCount() {
		// 			    return this.$store.getters.cartLength
		// 	      }
		}
	}
</script>

<style>
	.cart{
		height: 100vh;
	}
	.nav-bar{
		background-color: var(--color-tint);
		color: #fff;
		/* position: fixed; */
	}
	 .cart-list {
	    position: absolute;
	    top: 44px;
	    bottom: 49px;
	    width: 100%;
	  }
</style>
