<template>
	<div class="check-button" :class="{check:isChecked}">
		<img src="../../../assets/img/cart/tick.svg" />
	</div>
</template>

<script>
	export default{
		name:"CheckButton",
		props:{
			isChecked:{
				type:Boolean,
				default:false
			}
		}
	}
</script>

<style>
	.check-button{
		/* //background-color: #00A8E6; */
		border-radius: 50%;
		border: 2px solid #aaa;
	}
	.check{
		border-color: red;
		background-color: red;
	}
</style>
