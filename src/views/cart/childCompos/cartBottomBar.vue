<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button 
			class="check-button" 
			:isChecked="isSelectAll" 
			@click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="price">合计:{{totalPrice}}</div>
		<div class="calcluate" @click="calcClick">去计算:{{checkLength}}</div>
	</div>
</template>

<script>
	import CheckButton from '../../../components/common/checkButton/CheckButton.vue'
	import {mapGetters} from 'vuex'
	export default{
		name:"cartBottomBar",
		components:{
			CheckButton,
			mapGetters
		},
		methods:{
			checkClick(){
				//console.log('qqqqqqqqq')
				if(this.isSelectAll){//全部选中
				//当全选属于全部选中状态，再次点击的时候,就会取消全选,同时取消上方商品的选中
					this.cartList.forEach(item=>item.checked=false)
				}else{//部分或全部不选中，再次点击的时候，会进行选中状态，同时全选上方商品
				this.cartList.forEach(item=>item.checked=true)
					
					
				}
			},
			calcClick(){
				if(!this.isSelectAll){
					this.$toast.show('请选择购买的商品',2000)
				}
			}
		},
		computed:{
			...mapGetters(['cartList']),
			totalPrice(){
				return '￥'+this.cartList.filter(item=>{
					return item.checked
				}).reduce((preValue,item)=>{
					return preValue+item.price* item.count
				},0).toFixed(2)
			},
			checkLength(){
				return this.cartList.filter(item=>item.checked).length
			},
			isSelectAll(){
				if(this.cartList.length===0) return false
				//1.使用find
				// return !this.cartList.find(item=>!item.checked)
				// //2.使用filter
				// return !(this.cartList.filter(item=>!item.checked).length)
				//3.普通遍历
				for(let item of this.cartList){
					if(!item.checked){
						return false
					}
				}
				return true
			}
			
		}
	}
</script>

<style>
	.bottom-bar{
		height: 40px;
		position: relative;
		background-color: #fff;
		margin-top: 500px;
		display: flex;
		align-items: center;
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 5px;
		width: 60px;
	}
	.check-button{
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	.price{
		margin-left: 20px;
		flex: 1;
	}
	.calcluate{
		width: 90px;
	}
</style>
