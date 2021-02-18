<template>
	<!-- 使用better-scroll，最外层放一个盒子，
	内层放置一个存放内容的盒子 ，中间放插槽，
	可用任意盒子替换-->
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name:"Scroll",
		props:{ //父传子，待父级传值
			probeType:{  //类型，默认为0,不派发scroll事件，1会非实时派发scroll 事件 2屏幕滑动的过程中实时的派发 scroll 事件 3 在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
				type:Number,
				default:0
			},
			pullUpLoad:{ //做上拉加载功能,默认为false，当为true/object时可做上拉加载功能
				type:Boolean,
				default:false
			}
		},
	data(){
		return{
			scroll:null  //存放scroll对象
		}
	},
	mounted() {
		//1.创建BS对象
		this.scroll=new BScroll(this.$refs.wrapper,{
			click:true,
			probeType:this.probeType,
			pullUpLoad:this.pullUpLoad
		})
		console.log(this.scroll)
		//2 监听滚动的位置
		if(this.probeType===2 || this.probeType===3){
			this.scroll.on('scroll',(position)=>{
				//console.log(position)
				this.$emit('scroll',position) //子传父，触发父级事件，监听滚动位置
			})
		}
		//console.log(this.scroll)
		//3 监听scroll滚动到底部
		if(this.pullUpLoad){
			this.scroll.on('pullingUp',()=>{
				this.$emit('pullingUp') //子传父，触发父级事件，监听是否滚到底部
				console.log('滚动到底部')
			})
		}
		
		//this.scroll.scrollTo(0,0)
	},
	methods:{
		scrollTo(x,y,time=300){
			 this.scroll.scrollTo(x,y,time) //通过time延迟后，滚动到一定区域
		},
		finishPullUp(){
		     this.scroll  &&	this.scroll.finishPullUp() //完成上拉加载
		},
		refresh(){
			this.scroll && this.scroll.refresh() //重新刷新
		},
		getScrollY(){
			return this.scroll?this.scroll.y:0 //获取高度
		}
		
		
		
	}
	
}
</script>

<style>
</style>
