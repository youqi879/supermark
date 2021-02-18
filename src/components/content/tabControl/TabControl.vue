<!-- 首页导航条--流行 新款 精选 -->
<template>
	<div class="tab-control">
		<!-- 依次取出父级传过来的数据  设置动态属性-->
		<div v-for="(item,index) in titles"   
		 class="tab-control-item"
		 :class="{active:index===currentIndex}"
		 @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"TabControl",
		data(){
			return{
				currentIndex:0
				}
		},
		props:{
			titles:{
				type:Array,
				default(){
					return[]
				}
			}
		},
		methods:{
			itemClick(index){
				this.currentIndex=index;//点击之后获取动态属性
				this.$emit('tabClick',index) //触发外部父级事件
			}
		}
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #FFF;
	}
	.tab-control-item{
		flex: 1;
		
	}
	.active{
		color: var(--color-tint);
		
	}
	.active span{
		border-bottom: 3px solid  var(--color-tint);
	}
</style>
