<template>
	<div class="nav-bar">
		<!-- 顶部导航栏，分为左中右三块区域，放置三个插槽，可以根据场景放置不同的东西 -->
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="right"><slot name="right"></slot></div>
		
	</div>
</template>

<script>
</script>

<style>
	.nav-bar{
		display: flex;
		height: 44px;
		line-height: 44px;
		text-align: center;
		box-shadow: 0 1px 1px rgba(100,100,100,.1);
	}
	.left{
		width: 60px;
		
	}
	.right{
		width: 60px;
	
	}
	.center{
		flex: 1;
		
	}
</style>
