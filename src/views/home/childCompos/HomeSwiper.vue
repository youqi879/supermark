<!-- 首页封装后的轮播图 -->
<template>
	<div>
		<swiper>
			 <SwiperItem v-for="(item,index) in banners" :key="index">
				 <a :href="item.link">
					<img :src="item.image"  @load="imageLoad"/> 
				 </a>
			 </SwiperItem>
		</swiper>
	</div>
</template>

<script>
	import {Swiper,SwiperItem} from '../../../components/common/swiper/index.js'
	export default{
		name:"HomeSwiper",
		components:{
			Swiper,
			SwiperItem
		},
		data(){
			return{
				isLoad:false
			}
		},
		props:{
			banners:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			imageLoad(){
				if(!this.isLoad){
					//console.log("--------");
					this.$emit('swiperImageLoad')
					this.isLoad=true
				}
				
			}
		}
	}
</script>

<style>
</style>
