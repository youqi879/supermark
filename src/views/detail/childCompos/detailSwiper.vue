<template>
	<swiper class="detail-item">
		<SwiperItem v-for="(item,index) in topImages" :key="index">
			<img :src="item" />
		</SwiperItem>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
	export default{
		name:"DetailSwiper",
		components:{
			Swiper,
			SwiperItem
		},
		props:{
			topImages:{
				type:Array,
				default(){
					return[]
				}
			}
		}
	}
</script>

<style>
	.detail-item{
		height: 500px;
		overflow: hidden;
	}
</style>
