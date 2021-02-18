<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll">
			<cart-list-item 
			v-for="(item,index) in cartList1 " 
			:itemInfo="item" 
			:key="index"></cart-list-item>
		</scroll>
	</div>
</template>

<script>
	import Scroll from '../../../components/common/scroll/Scroll.vue'
	import cartListItem from './cartListItem.vue'
	import {mapGetters} from 'vuex'
	export default{
		name:"CartList",
		props:{
			cartList1:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		components:{
			Scroll,
			cartListItem
		},
		computed:{
			...mapGetters(['cartList'])
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style>
	.cart-list{
		height: calc(100%-93px);
	}
	.content{
		height:100vh ;
		overflow: hidden;
	}
</style>
