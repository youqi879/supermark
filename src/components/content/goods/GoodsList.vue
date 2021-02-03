<!-- GoodsListItem的父级，层层封装显示数据 -->
<template>
	<div class="goods">
		<GoodsListItem
		v-for="item in goods" 
		:goods-item="item">
		</GoodsListItem>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	export default{
		name:"GoodsList",
		components:{
			GoodsListItem
		},
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.goods{
		display: flex;
		flex-wrap: wrap;/* //弹性盒元素在必要的时候拆行： */
		justify-content: space-around;/* //两列均等分 */
	}
</style>
