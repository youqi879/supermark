<!-- 轮播图下面的四张图“十点抢券” “好物特卖”“内购福利”“初秋上新” -->
<template>
	<div class="recommend">
		<div v-for="item in recommends" class="recommend-item">
			<a :href="item.link"></a>
			<img :src="item.image" />
			<div> {{item.title}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"RecommendViews",
		props:{
			recommends:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style>
	.recommend{
		display: flex;
		width: 100%;
		text-align: center;
		font-size: 12px;
		margin-top: 10px;
		padding: 10px 0 20px;
		padding-bottom: 30px;
		
		border-bottom: 8px solid #EEEEEE;
	}
	.recommend-item{
		flex: 1;
	}
	.recommend-item img{
		width: 70px;
		height: 70px;
		margin-bottom: 10px;
	}
</style>
