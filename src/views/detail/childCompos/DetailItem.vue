<template>
	<nav-bar >
	 <div slot="left">
		 <img src="../../../assets/img/common/back.svg" class="leftback" @click="backClick"/>
	 </div>
     <div slot="center"  class="detail-item">
		<div 
		v-for="(item,index) in titles"
		class="detail-item1"   
		:class="{active:index===currentIndex}"
		@click="tabClick(index)">{{item}}</div>
	</div>
	</nav-bar>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	export default{
		name:'DetailItem',
		components:{
			NavBar
		},
		data(){
			return{
				titles:['商品','参数','评论','推荐'],
				currentIndex:0
			}	
		},
		methods:{
			backClick(){
				this.$router.go(-1) //返回前一页
			},
			tabClick(index){
				this.currentIndex=index;
				this.$emit('titleClick',index)  //触发外部事件
			}
		}
	}
</script>

<style scoped>
	.detail-item{
		display: flex;
	}
	.detail-item1{
		flex: 1;
	}
	.leftback{
		margin-top: 10px;
		
	}
	.active{
		color: var(--color-tint);
	}
</style>
